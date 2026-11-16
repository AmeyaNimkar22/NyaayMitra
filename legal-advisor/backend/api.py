from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.rag.advisor_pipeline import AdvisorPipeline
import threading

from backend.answer_cache import AnswerCache, completeness, find_embedder, is_complete


app = FastAPI(title="NyaayMitra API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


pipeline = AdvisorPipeline()

# Answer memory: same / same-meaning question -> same answer (see answer_cache.py).
answer_cache = AnswerCache(embed=find_embedder(pipeline))

# The Groq client shared by the situation analyzer and the answer generator.
_llm = getattr(getattr(pipeline.advisor.graph.generator, "llm_generate", None), "__self__", None)
_retry_lock = threading.Lock()
RETRY_SEED = 43


def _retry_with_other_seed(query: str):
    """One extra pipeline run with a different seed, used only when the first
    answer came back incomplete (e.g. no next steps / evidence)."""
    if _llm is None or not hasattr(_llm, "seed"):
        return pipeline.analyze(query)
    with _retry_lock:
        original = _llm.seed
        _llm.seed = RETRY_SEED
        try:
            return pipeline.analyze(query)
        finally:
            _llm.seed = original


class AskRequest(BaseModel):
    query: str


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/advisor/ask")
def ask_advisor(request: AskRequest):
    query = (request.query or "").strip()
    if not query:
        # Unchanged behaviour: the pipeline returns INVALID_INPUT for empty input.
        return pipeline.analyze(request.query)

    cached, vector = answer_cache.lookup(query)
    if cached is not None:
        return cached

    answer = pipeline.analyze(query)

    # Incomplete answer (missing law / next steps / evidence)? Try once more and
    # keep whichever answer is more complete. Refusals/errors are not retried.
    if not is_complete(answer) and completeness(answer) >= 100:
        try:
            retry = _retry_with_other_seed(query)
            if completeness(retry) > completeness(answer):
                answer = retry
        except Exception as exc:  # never fail the request because of the retry
            print(f"[answer-cache] retry failed: {exc}")

    answer_cache.store(query, vector, answer)
    return answer
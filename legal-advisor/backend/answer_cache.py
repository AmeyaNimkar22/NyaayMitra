"""Answer memory for the Legal Advisor API (adapter layer, outside the RAG pipeline).

Goal: the same question, or a question with the same meaning, gets the same
answer every time.

How it works
------------
1. The question is normalised (lower-case, whitespace and punctuation collapsed).
   If an identical normalised question was answered before -> return that answer.
2. Otherwise the question is embedded with the SAME embedding model the
   retriever already uses (all-MiniLM-L6-v2, normalised vectors) and compared
   with stored questions by cosine similarity. If the best match is at or above
   the threshold (default 0.90) -> return that answer.
3. Otherwise the normal RAG pipeline runs. Only grounded AND complete answers
   are stored (status SUPPORTED / PARTIALLY_SUPPORTED with relevant law, next
   steps, evidence and authority filled in), so an error, a refusal or a half-empty answer
   is never locked in. Incomplete answers already in the file are ignored.

Storage: data/answer_cache/answers.json (local, git-ignored with the rest of data/).
The file name includes the knowledge-base fingerprint, so rebuilding the index
automatically starts a fresh cache.

Settings (legal-advisor/.env, all optional):
    NYAAYMITRA_ANSWER_CACHE=on|off          (default on)
    NYAAYMITRA_CACHE_SIMILARITY=0.90        (0-1; higher = stricter matching)

To clear the memory: stop the backend and delete data/answer_cache/.
"""
from __future__ import annotations

import copy
import hashlib
import json
import os
import re
import threading
import time
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional

CACHEABLE_STATUSES = {"SUPPORTED", "PARTIALLY_SUPPORTED"}

# Sections that must be non-empty for an answer to count as "complete".
REQUIRED_SECTIONS = ("applicable_law", "recommended_next_steps", "evidence_checklist", "authority")
# All user-facing list sections, used to compare how complete two answers are.
SCORED_SECTIONS = (
    "applicable_law",
    "rights",
    "responsibilities",
    "evidence_checklist",
    "recommended_next_steps",
    "authority",
)


def _non_empty(answer: Dict[str, Any], key: str) -> bool:
    value = answer.get(key)
    return isinstance(value, list) and len(value) > 0


def is_complete(answer: Any) -> bool:
    return (
        isinstance(answer, dict)
        and str(answer.get("status", "")).upper() in CACHEABLE_STATUSES
        and all(_non_empty(answer, key) for key in REQUIRED_SECTIONS)
    )


def completeness(answer: Any) -> int:
    """Higher = more useful. Grounded status first, then number of filled sections."""
    if not isinstance(answer, dict):
        return -1
    grounded = 100 if str(answer.get("status", "")).upper() in CACHEABLE_STATUSES else 0
    return grounded + sum(_non_empty(answer, key) for key in SCORED_SECTIONS)
CACHE_DIR = Path("data/answer_cache")
MAX_ENTRIES = 2000


def normalize_query(query: str) -> str:
    text = query.lower().replace("₹", " rs ")
    text = re.sub(r"[^\w\s]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _kb_fingerprint() -> str:
    """Changes when the knowledge base (chunks) changes."""
    h = hashlib.sha256()
    for path in sorted(Path("data/chunks").glob("*.json")):
        stat = path.stat()
        h.update(f"{path.name}:{stat.st_size}:{int(stat.st_mtime)}".encode())
    return h.hexdigest()[:12]


class AnswerCache:
    def __init__(self, embed: Optional[Callable[[str], List[float]]]):
        self.enabled = os.getenv("NYAAYMITRA_ANSWER_CACHE", "on").strip().lower() not in {"off", "false", "0", "no"}
        try:
            self.threshold = float(os.getenv("NYAAYMITRA_CACHE_SIMILARITY", "0.90"))
        except ValueError:
            self.threshold = 0.90
        self.embed = embed
        self.lock = threading.Lock()
        self.path = CACHE_DIR / f"answers_{_kb_fingerprint()}.json"
        self.entries: List[Dict[str, Any]] = self._load()

    # ------------------------------------------------------------------ io
    def _load(self) -> List[Dict[str, Any]]:
        if not self.enabled:
            return []
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
            if not isinstance(data, list):
                return []
            # Drop answers saved before the completeness rule existed.
            return [e for e in data if isinstance(e, dict) and is_complete(e.get("answer"))]
        except FileNotFoundError:
            return []
        except Exception as exc:  # corrupt file: start fresh, never crash the API
            print(f"[answer-cache] could not read {self.path}: {exc}")
            return []

    def _save(self) -> None:
        try:
            CACHE_DIR.mkdir(parents=True, exist_ok=True)
            tmp = self.path.with_suffix(".tmp")
            tmp.write_text(json.dumps(self.entries[-MAX_ENTRIES:], ensure_ascii=False), encoding="utf-8")
            os.replace(tmp, self.path)
        except Exception as exc:
            print(f"[answer-cache] could not save: {exc}")

    # -------------------------------------------------------------- lookup
    def _embed(self, query: str) -> Optional[List[float]]:
        if self.embed is None:
            return None
        try:
            return [float(x) for x in self.embed(query)]
        except Exception as exc:
            print(f"[answer-cache] embedding failed, using exact match only: {exc}")
            return None

    @staticmethod
    def _cosine(a: List[float], b: List[float]) -> float:
        # Vectors are already L2-normalised by EmbeddingModel -> dot product = cosine.
        return float(sum(x * y for x, y in zip(a, b)))

    def lookup(self, query: str) -> tuple[Optional[Dict[str, Any]], Optional[List[float]]]:
        """Returns (cached_answer_or_None, query_vector_for_storing)."""
        if not self.enabled:
            return None, None
        norm = normalize_query(query)
        with self.lock:
            for entry in reversed(self.entries):
                if entry.get("normalized") == norm:
                    return self._hit(entry, "exact", 1.0), entry.get("vector")

        vector = self._embed(query)
        if vector is None:
            return None, None

        best, best_score = None, -1.0
        with self.lock:
            for entry in self.entries:
                vec = entry.get("vector")
                if vec and len(vec) == len(vector):
                    score = self._cosine(vector, vec)
                    if score > best_score:
                        best, best_score = entry, score
        if best is not None and best_score >= self.threshold:
            return self._hit(best, "similar", best_score), vector
        return None, vector

    @staticmethod
    def _hit(entry: Dict[str, Any], kind: str, score: float) -> Dict[str, Any]:
        answer = copy.deepcopy(entry["answer"])
        answer["cache"] = {
            "hit": True,
            "match": kind,
            "similarity": round(score, 4),
            "matched_query": entry.get("query"),
            "cached_at": entry.get("created_at"),
        }
        return answer

    # --------------------------------------------------------------- store
    def store(self, query: str, vector: Optional[List[float]], answer: Dict[str, Any]) -> None:
        if not self.enabled or not is_complete(answer):
            return
        if vector is None:
            vector = self._embed(query)
        entry = {
            "query": query,
            "normalized": normalize_query(query),
            "vector": vector,
            "answer": {k: v for k, v in answer.items() if k != "cache"},
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        }
        with self.lock:
            self.entries = [e for e in self.entries if e.get("normalized") != entry["normalized"]]
            self.entries.append(entry)
            self._save()


def find_embedder(pipeline: Any) -> Optional[Callable[[str], List[float]]]:
    """Reuse the retriever's already-loaded embedding model (no second load)."""
    try:
        model = pipeline.advisor.graph.retriever.vector_retriever.embedding_model
        return model.encode_one
    except AttributeError:
        print("[answer-cache] embedding model not found on pipeline; exact-match only.")
        return None

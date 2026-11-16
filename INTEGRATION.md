# NyaayMitra – Integrated Setup & Startup

One frontend, three modules, each backend in its own process so one failing doesn't take down the others.

```
Browser ──► Vite dev server :3000  (client/, shared frontend)
             └─ /api/advisor/*  ──proxy──► Legal Advisor (legal-advisor/, FastAPI) :8001
             └─ /api/scan/*     ──proxy──► Scan & Learn (backend/, FastAPI)       :8000
Games – frontend only, no backend
```

| Module | Folder | Python | Port | Data / external services |
|---|---|---|---|---|
| Shared frontend | `client/` (+ root `package.json`, `vite.config.ts`) | Node + pnpm | 3000 | – |
| Legal Advisor | `legal-advisor/` | **3.12** (own `.venv`) | 8001 | Local ChromaDB (`legal-advisor/data/vectorstore`), BM25 chunks (`data/chunks`), Groq API, Hugging Face models |
| Scan & Learn | `backend/` | **3.11** (own `venv311`) | 8000 | MongoDB (`MONGO_URI`), PaddleOCR, MobileNet `.pth` |
| Games | `client/src/components/*` | – | – | – |

The two Python backends use different Python, torch, numpy and FastAPI versions. **Do not merge their virtual environments.**

## 1. One-time setup

### Frontend
```powershell
cd C:\Users\hp\NyaayMitra
pnpm install
```

### Legal Advisor
The code was copied from `Downloads\NyaayMitra2.0`. Its `.env` (secrets) and `.venv` were **not** copied.

1. Create the env file (never commit it — it is git-ignored):
   ```powershell
   copy C:\Users\hp\Downloads\NyaayMitra2.0\.env C:\Users\hp\NyaayMitra\legal-advisor\.env
   ```
2. Python environment — either:
   - **Reuse the existing one** (no install needed): use `C:\Users\hp\Downloads\NyaayMitra2.0\.venv\Scripts\python.exe` in the start command below, or
   - **Create a new one** inside `legal-advisor`:
     ```powershell
     cd C:\Users\hp\NyaayMitra\legal-advisor
     py -3.12 -m venv .venv
     .\.venv\Scripts\python.exe -m pip install -r requirements.txt
     ```
3. The knowledge base (`data/chunks`, `data/vectorstore`) was copied with the code. These folders are git-ignored, so teammates cloning from GitHub must rebuild them:
   `python -m backend.ingestion.run_ingestion` then `python -m backend.rag.build_index`.
4. The first start downloads `sentence-transformers/all-MiniLM-L6-v2` and `cross-encoder/ms-marco-MiniLM-L-6-v2` from Hugging Face if they aren't already cached.

### Scan & Learn
Unchanged. `backend\.env` needs `MONGO_URI`; venv is `backend\venv311`.

## 2. Start everything (three terminals)

**Terminal 1 – Legal Advisor (must be started from `legal-advisor/`, because it uses relative `data/` paths):**
```powershell
cd C:\Users\hp\NyaayMitra\legal-advisor
C:\Users\hp\Downloads\NyaayMitra2.0\.venv\Scripts\python.exe -m uvicorn backend.api:app --host 127.0.0.1 --port 8001
# (or .\.venv\Scripts\python.exe … if you created a venv in step 1.2)
```
Check: open http://127.0.0.1:8001/api/health → `{"status":"ok"}`. Startup takes a while (it loads the embedding model, reranker and Groq client).

**Terminal 2 – Scan & Learn (needed for the Scan & Learn page):**
```powershell
cd C:\Users\hp\NyaayMitra\backend
.\venv311\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000
```

**Terminal 3 – Frontend:**
```powershell
cd C:\Users\hp\NyaayMitra
pnpm dev
```
Open http://localhost:3000, log in (mock login: any email and password), then go to **Legal Advisor**.

## 3. Environment variables (names only)

| File | Variable | Used by | Required |
|---|---|---|---|
| `legal-advisor/.env` | `GROQ_API_KEY` | `backend/rag/llm_client.py` (Groq `openai/gpt-oss-20b`) | **Yes** – the API won't start without it |
| `legal-advisor/.env` | `NYAAYMITRA_OLLAMA_MODEL`, `NYAAYMITRA_OLLAMA_BASE_URL` | only the old Ollama scripts; **not used by the API** | No |
| `legal-advisor/.env` | `NYAAYMITRA_MAX_CHUNK_CHARACTERS` | ingestion | No |
| `legal-advisor/.env` | `NYAAYMITRA_ANSWER_CACHE` (`on`/`off`, default on) | answer memory in `backend/answer_cache.py` | No |
| `legal-advisor/.env` | `NYAAYMITRA_CACHE_SIMILARITY` (default `0.90`) | how similar a question must be to reuse a saved answer | No |
| `backend/.env` | `MONGO_URI` | Scan & Learn | Yes, for Scan & Learn |
| shell env (optional) | `LEGAL_ADVISOR_URL` | `vite.config.ts` proxy target (default `http://127.0.0.1:8001`) | No |
| root `.env` (optional) | `VITE_ADVISOR_API_BASE` | frontend base URL (default `/api/advisor`, via the proxy) | No |
| root `.env` (optional) | `VITE_ADVISOR_USE_MOCK=true` | turns the old demo answers back on, for offline UI work only | No |
| shell env (optional) | `SCAN_LEARN_URL` | `vite.config.ts` proxy target for Scan & Learn (default `http://127.0.0.1:8000`) | No |
| root `.env` (optional) | `VITE_SCAN_USE_MOCK=true` | shows the old fixed Scan & Learn demo guide, for offline UI work only | No |

## 4. Legal Advisor API contract

`POST /api/advisor/ask` with body `{"query": "<question>"}` → HTTP 200 JSON with `status` set to one of:

- `SUPPORTED` / `PARTIALLY_SUPPORTED` — the answer comes with `situation`, `legal_area[]`, `applicable_law[]`, `rights[]`, `responsibilities[]`, `evidence_checklist[]`, `recommended_next_steps[]`, `authority[]`, `important_note` and `sources[]`.
- `NO_RELEVANT_SOURCE` / `INSUFFICIENT_INFORMATION` — no answer, because the evidence gate blocked it. Comes with `error` and possibly `sources[]`.
- `INVALID_INPUT` (empty query), `GENERATION_ERROR` or `INVALID_STRUCTURE` — comes with `error`.

The frontend adapter is `toGuidance()` in `client/src/lib/civicAdvisorService.ts`. It maps this response to the UI and shows blocked and error statuses as a notice instead of an answer. Network failures, HTTP errors and requests over 180 seconds show an error message in the chat.

## 5. Troubleshooting

- **"Couldn't reach the Legal Advisor service"** – Terminal 1 isn't running, or it isn't on port 8001.
- **`RuntimeError: GROQ_API_KEY is not set`** – `legal-advisor\.env` is missing.
- **Empty or blocked answers** – check that `legal-advisor\data\vectorstore\chroma.sqlite3` and `data\chunks\*.json` exist.
- **Clear saved answers** – stop the Legal Advisor backend and delete `legal-advisor\data\answer_cache\`. It is also reset automatically when the knowledge base (`data/chunks`) changes.

## 6. Scan & Learn notes

- The page uploads the photo to `POST /api/scan/ocr` (proxied to `backend/main.py` `/ocr`). The backend runs PaddleOCR, then the keyword classifier or the MobileNet model, then reads the guidance from MongoDB (`CivicGuidesDB.civic_knowledge`). The adapter is `toPlaceGuide()` in `client/src/lib/scanLearnService.ts`.
- **MongoDB Atlas only accepts IPs on its Network Access list.** An `SSL handshake failed … TLSV1_ALERT_INTERNAL_ERROR` error means your IP is not on it. On IPv6-only networks (e.g. Jio, which use NAT64) your visible IP is not the one Atlas sees, so add `0.0.0.0/0` for development. Test with: `python -c "from database import client; print(client.admin.command('ping'))"` inside `backend/`.
- If Windows shows "An Application Control policy has blocked this file", Smart App Control is blocking part of the Python environment; allow it or create a fresh venv. `paddlepaddle==3.2.0` worked on Windows where `3.3.1` did not.

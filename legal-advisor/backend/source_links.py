"""Source page links for Legal Advisor answers (adapter layer, outside the RAG pipeline).

Goal: every source returned with an answer gets a link that opens the original
document from data/raw at the exact page the cited passage comes from.

How it works
------------
1. Every file in data/raw is mapped to its document_id, using the same rule as
   ingestion (lower-case file name, every non-alphanumeric character -> "_").
   That document_id is also the name of its data/chunks/<document_id>.json file.
2. Every chunk in data/chunks is mapped from its global chunk_id
   ("<document_id>__<chunk_id>", the same id used by ChromaDB and BM25) to its
   page_start / page_end.
3. add_source_links() adds new fields to each source of an answer:
       document_title, file_type, page_start, page_end, url
   Existing fields are never changed or removed, and the original answer
   object (which may be the cached copy) is not modified.
4. resolve_source_document() is used by the /api/advisor/source-document
   endpoint. It only returns files that are inside data/raw.

PDF links end with "#page=N", which makes the browser's PDF viewer open that
page. DOCX / HTML / TXT / CSV / XLSX have no pages, so their links open the
document without a page.

The mappings are built once, on first use. Restart the backend after changing
data/raw or rebuilding data/chunks.
"""
from __future__ import annotations

import copy
import json
import threading
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

RAW_DIR = Path("data/raw")
CHUNKS_DIR = Path("data/chunks")
SOURCE_DOCUMENT_ROUTE = "/api/advisor/source-document"

# Same extensions ingestion accepts (backend/ingestion/run_ingestion.py).
MEDIA_TYPES = {
    ".pdf": "application/pdf",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".csv": "text/csv; charset=utf-8",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".txt": "text/plain; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".htm": "text/html; charset=utf-8",
}

_lock = threading.Lock()
_loaded = False
_documents: Dict[str, Path] = {}  # document_id -> file in data/raw
_chunk_pages: Dict[str, Tuple[Optional[int], Optional[int]]] = {}  # global chunk_id -> (start, end)


def create_document_id(file_path: Path) -> str:
    """Copy of backend/ingestion/parsers/pdf_parser.create_document_id (kept
    here so this module does not import the PDF/OCR libraries)."""
    filename = Path(file_path).stem.lower()
    safe_name = "".join(char if char.isalnum() else "_" for char in filename)
    return safe_name.strip("_")


def _as_page(value: Any) -> Optional[int]:
    try:
        page = int(value)
    except (TypeError, ValueError):
        return None
    return page if page > 0 else None


def _load() -> None:
    global _loaded
    with _lock:
        if _loaded:
            return

        if RAW_DIR.exists():
            for path in sorted(RAW_DIR.rglob("*")):
                if path.is_file() and path.suffix.lower() in MEDIA_TYPES:
                    # First file wins if two names give the same id (same as ingestion order).
                    _documents.setdefault(create_document_id(path), path)

        if CHUNKS_DIR.exists():
            for path in sorted(CHUNKS_DIR.glob("*.json")):
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        chunks = json.load(f)
                except Exception as exc:  # a bad chunk file must not stop the API
                    print(f"[source-links] could not read {path.name}: {exc}")
                    continue
                if not isinstance(chunks, list):
                    continue
                for chunk in chunks:
                    if not isinstance(chunk, dict) or not chunk.get("chunk_id"):
                        continue
                    metadata = chunk.get("metadata") or {}
                    pages = [p for p in (_as_page(x) for x in chunk.get("pages") or []) if p]
                    start = _as_page(metadata.get("page_start")) or (min(pages) if pages else None)
                    end = _as_page(metadata.get("page_end")) or (max(pages) if pages else start)
                    _chunk_pages[f"{path.stem}__{chunk['chunk_id']}"] = (start, end)

        print(f"[source-links] {len(_documents)} source documents, {len(_chunk_pages)} chunks mapped to pages.")
        _loaded = True


def _document_id_for(source: Dict[str, Any]) -> str:
    chunk_id = str(source.get("chunk_id") or "")
    if "__" in chunk_id:
        return chunk_id.split("__", 1)[0]
    return str(source.get("document_id") or source.get("source_file") or "")


def _link_fields(source: Dict[str, Any]) -> Dict[str, Any]:
    document_id = _document_id_for(source)
    path = _documents.get(document_id)
    if path is None:
        return {}

    start, end = _chunk_pages.get(str(source.get("chunk_id") or ""), (None, None))
    file_type = path.suffix.lower().lstrip(".")
    url = f"{SOURCE_DOCUMENT_ROUTE}/{document_id}"
    if file_type == "pdf" and start:
        url += f"#page={start}"
    else:
        # Page numbers are only meaningful for PDFs.
        start = end = None

    return {
        "document_title": path.stem,
        "file_type": file_type,
        "page_start": start,
        "page_end": end or start,
        "url": url,
    }


def add_source_links(answer: Any) -> Any:
    """Return a copy of the answer whose sources carry link fields.
    Answers without sources are returned unchanged."""
    if not isinstance(answer, dict):
        return answer
    sources = answer.get("sources")
    if not isinstance(sources, list) or not sources:
        return answer

    try:
        _load()
        linked = copy.deepcopy(answer)
        for source in linked["sources"]:
            if isinstance(source, dict):
                for key, value in _link_fields(source).items():
                    source.setdefault(key, value)
        return linked
    except Exception as exc:  # never fail the answer because of the links
        print(f"[source-links] could not add links: {exc}")
        return answer


def resolve_source_document(document_id: str) -> Optional[Tuple[Path, str]]:
    """Return (file path, media type) for a document in data/raw, or None."""
    _load()
    path = _documents.get(document_id or "")
    if path is None:
        return None
    resolved = path.resolve()
    if RAW_DIR.resolve() not in resolved.parents or not resolved.is_file():
        return None
    return resolved, MEDIA_TYPES[resolved.suffix.lower()]

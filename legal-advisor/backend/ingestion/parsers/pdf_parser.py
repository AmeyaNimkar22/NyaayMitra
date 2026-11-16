import re
from pathlib import Path

import pymupdf
import pytesseract
from PIL import Image

from backend.ingestion.structure.document_model import (
    Document,
    Page,
    RawBlock,
)


TESSERACT_PATH = Path(
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

OCR_DPI = 200
OCR_LANGUAGE = "eng"


def create_document_id(file_path: str) -> str:
    filename = Path(file_path).stem.lower()

    safe_name = "".join(
        char if char.isalnum() else "_"
        for char in filename
    )

    return safe_name.strip("_")


def _configure_tesseract():
    """
    Configure the Tesseract executable on Windows.
    """

    if TESSERACT_PATH.exists():
        pytesseract.pytesseract.tesseract_cmd = str(
            TESSERACT_PATH
        )


_FOOTNOTE_MARKER = re.compile(r"^[*†‡]?\d{1,3}[*†‡]?$")


def _drop_footnote_markers(spans):
    """
    Remove superscript footnote reference numbers from a line.

    Official Indian Act PDFs print amendment footnote markers as small
    superscript digits directly before section numbers, e.g. a tiny "2"
    before "66A." PyMuPDF returns that as its own span, and joining the
    spans produced "266A." (a wrong section number). A span is treated as
    a marker only if it is just 1-3 digits (optionally with * † ‡) AND is
    flagged superscript or printed noticeably smaller than the rest of
    the line. Removed markers are kept in the line metadata.
    """

    if len(spans) < 2:
        return spans, []

    sizes = [s.get("font_size") or 0 for s in spans]
    max_size = max(sizes) if sizes else 0
    kept, markers = [], []

    for span in spans:
        text = span["text"].strip()
        size = span.get("font_size") or 0
        is_superscript = bool((span.get("flags") or 0) & 1)
        is_small = max_size > 0 and size < 0.8 * max_size

        if _FOOTNOTE_MARKER.match(text) and (is_superscript or is_small):
            markers.append(text)
        else:
            kept.append(span)

    if not kept:  # never drop a whole line
        return spans, []

    return kept, markers


def _extract_blocks_from_dict(page, page_number: int):
    """
    Primary PyMuPDF structured extraction.
    """

    page_dict = page.get_text("dict")

    blocks = []

    for block_number, block in enumerate(
        page_dict.get("blocks", []),
        start=1,
    ):

        if block.get("type") != 0:
            continue

        lines = []

        for line in block.get("lines", []):

            spans = []

            for span in line.get("spans", []):

                raw_text = span.get("text", "")

                if not raw_text.strip():
                    continue

                spans.append(
                    {
                        "text": raw_text,
                        "font": span.get("font"),
                        "font_size": span.get("size"),
                        "flags": span.get("flags"),
                        "bbox": span.get("bbox"),
                    }
                )

            spans, footnote_markers = _drop_footnote_markers(spans)

            if spans:
                line_entry = {"spans": spans}
                if footnote_markers:
                    line_entry["footnote_markers"] = footnote_markers
                lines.append(line_entry)

        if not lines:
            continue

        text_lines = []

        for line in lines:

            line_text = "".join(
                span["text"]
                for span in line["spans"]
            )

            if line_text.strip():
                text_lines.append(line_text)

        text = "\n".join(text_lines).strip()

        if not text:
            continue

        block_id = (
            f"p{page_number}_b{block_number}"
        )

        blocks.append(
            RawBlock(
                block_id=block_id,
                page_number=page_number,
                text=text,
                block_type="text",
                bbox=block.get("bbox"),
                metadata={
                    "lines": lines,
                    "extraction_method": "pymupdf_dict",
                },
            )
        )

    return blocks


def _extract_plain_text(page, page_number: int):
    """
    Plain text fallback.
    """

    try:
        text = page.get_text("text")
    except Exception:
        return []

    text = text.strip()

    if not text:
        return []

    return [
        RawBlock(
            block_id=f"p{page_number}_text_fallback",
            page_number=page_number,
            text=text,
            block_type="text",
            bbox=None,
            metadata={
                "extraction_method": "pymupdf_text_fallback",
            },
        )
    ]


def _ocr_page(page, page_number: int):
    """
    OCR fallback for image/scanned pages.

    OCR is used ONLY when normal PDF text extraction
    produced no usable text.
    """

    if not TESSERACT_PATH.exists():
        return []

    try:
        matrix = pymupdf.Matrix(
            OCR_DPI / 72,
            OCR_DPI / 72,
        )

        pixmap = page.get_pixmap(
            matrix=matrix,
            alpha=False,
        )

        image = Image.frombytes(
            "RGB",
            [
                pixmap.width,
                pixmap.height,
            ],
            pixmap.samples,
        )

        text = pytesseract.image_to_string(
            image,
            lang=OCR_LANGUAGE,
        )

        text = text.strip()

        if not text:
            return []

        return [
            RawBlock(
                block_id=f"p{page_number}_ocr_b1",
                page_number=page_number,
                text=text,
                block_type="text",
                bbox=None,
                metadata={
                    "extraction_method": "tesseract_ocr",
                    "ocr_language": OCR_LANGUAGE,
                    "ocr_dpi": OCR_DPI,
                },
            )
        ]

    except Exception as exc:
        print(
            f"OCR failed on page {page_number}: {exc}"
        )
        return []


def extract_pdf(file_path: str) -> Document:
    """
    Extract PDF content using a three-level strategy:

    1. PyMuPDF structured text extraction
    2. PyMuPDF plain-text extraction
    3. Tesseract OCR for scanned/image pages

    OCR is only performed when the first two
    extraction methods produce no usable text.
    """

    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(
            f"File not found: {file_path}"
        )

    if path.suffix.lower() != ".pdf":
        raise ValueError(
            f"Expected PDF file, got: {path.suffix}"
        )

    document_id = create_document_id(
        file_path
    )

    _configure_tesseract()

    pages = []

    primary_pages = 0
    fallback_text_pages = 0
    ocr_pages = 0
    empty_pages = 0

    with pymupdf.open(file_path) as pdf:

        for page_number, page in enumerate(
            pdf,
            start=1,
        ):

            # -----------------------------------------
            # 1. Structured PyMuPDF extraction
            # -----------------------------------------

            blocks = _extract_blocks_from_dict(
                page,
                page_number,
            )

            extraction_method = "pymupdf_dict"

            if blocks:
                primary_pages += 1

            # -----------------------------------------
            # 2. Plain text fallback
            # -----------------------------------------

            if not blocks:

                blocks = _extract_plain_text(
                    page,
                    page_number,
                )

                if blocks:
                    fallback_text_pages += 1
                    extraction_method = (
                        "pymupdf_text_fallback"
                    )

            # -----------------------------------------
            # 3. OCR fallback
            # -----------------------------------------

            if not blocks:

                blocks = _ocr_page(
                    page,
                    page_number,
                )

                if blocks:
                    ocr_pages += 1
                    extraction_method = "tesseract_ocr"

            # -----------------------------------------
            # 4. Still empty
            # -----------------------------------------

            if not blocks:
                empty_pages += 1
                extraction_method = "empty"

            pages.append(
                Page(
                    page_number=page_number,
                    blocks=blocks,
                    metadata={
                        "extraction_method": extraction_method,
                    },
                )
            )

    return Document(
        document_id=document_id,
        file_name=path.name,
        file_type="pdf",
        title=path.stem,
        pages=pages,
        metadata={
            "parser": "pymupdf_tesseract",
            "primary_extraction_pages": primary_pages,
            "fallback_text_pages": fallback_text_pages,
            "ocr_pages": ocr_pages,
            "empty_pages": empty_pages,
        },
    )
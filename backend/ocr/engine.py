from paddleocr import PaddleOCR


ocr = PaddleOCR(
    lang="en",
    enable_mkldnn=False
)


def extract_text(image_path: str) -> str:
    result = ocr.predict(image_path)

    extracted_text = []

    for page in result:
        data = page.json

        if "res" in data:
            data = data["res"]

        if "rec_texts" in data:
            extracted_text.extend(data["rec_texts"])

    return "\n".join(extracted_text)
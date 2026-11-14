
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from database import civic_knowledge
from classifier import classify_text
from image_classifier import classify_image
from ocr.engine import extract_text

import shutil
import os


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# MobileNet class → MongoDB domain/topic mapping
# --------------------------------------------------

IMAGE_CLASS_MAPPING = {
    "hospital": {
        "domain": "Healthcare",
        "topic": "Patient Rights"
    },

    "railway_station": {
        "domain": "Railways",
        "topic": "Passenger Rights"
    },

    "religious_place": {
        "domain": "Religious Places",
        "topic": "Religious Freedom & Responsibilities"
    },

    "road_traffic": {
        "domain": "Road Traffic",
        "topic": "Road Safety & Traffic Responsibilities"
    },

    "shop_mall": {
        "domain": "Consumer",
        "topic": "Consumer Rights"
    }
}


# --------------------------------------------------
# Public Space fallback
# --------------------------------------------------

PUBLIC_SPACE_FALLBACK = {
    "domain": "Public Space",
    "topic": "Public Rights & Responsibilities"
}


@app.get("/")
def home():
    return {
        "message": "CivicGuides OCR API is running"
    }


@app.post("/ocr")
async def ocr_image(file: UploadFile = File(...)):

    file_path = f"temp_{file.filename}"

    try:

        # ------------------------------------------
        # Save uploaded image temporarily
        # ------------------------------------------

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)


        # ------------------------------------------
        # Step 1: OCR
        # ------------------------------------------

        text = extract_text(file_path)


        # ------------------------------------------
        # Step 2: Classification
        # ------------------------------------------

        classification = None
        classification_method = None

        # ------------------------------------------
        # CASE 1: OCR detected text
        # ------------------------------------------

        if text.strip():

            classification = classify_text(text)

            # OCR successfully identified a domain
            if classification["domain"] != "Unknown":

                classification_method = "OCR"

            # OCR detected text but could NOT
            # identify one of the five domains.
            # Therefore send the image to MobileNet.
            else:

                image_result = classify_image(file_path)

                predicted_class = image_result["class"]
                confidence = image_result["confidence"]

                classification = IMAGE_CLASS_MAPPING.get(
                    predicted_class
                )

                # MobileNet could not identify
                # any supported visual class
                if classification is None:

                    classification = PUBLIC_SPACE_FALLBACK.copy()

                else:

                    classification = classification.copy()

                classification["image_class"] = predicted_class
                classification["confidence"] = confidence

                classification_method = "Image AI"


        # ------------------------------------------
        # CASE 2: OCR detected NO text
        # ------------------------------------------

        else:

            # Directly use MobileNet
            image_result = classify_image(file_path)

            predicted_class = image_result["class"]
            confidence = image_result["confidence"]

            classification = IMAGE_CLASS_MAPPING.get(
                predicted_class
            )

            # MobileNet could not identify
            # any supported visual class
            if classification is None:

                classification = PUBLIC_SPACE_FALLBACK.copy()

            else:

                classification = classification.copy()

            classification["image_class"] = predicted_class
            classification["confidence"] = confidence

            classification_method = "Image AI"


        # ------------------------------------------
        # Step 3: Fetch information from MongoDB
        # ------------------------------------------

        civic_info = civic_knowledge.find_one(
            {
                "domain": classification["domain"],
                "topic": classification["topic"]
            }
        )


        # MongoDB ObjectId cannot be returned directly
        if civic_info:
            civic_info["_id"] = str(civic_info["_id"])


        # ------------------------------------------
        # Step 4: Return result
        # ------------------------------------------

        return {
            "filename": file.filename,
            "text": text,
            "classification_method": classification_method,
            "classification": classification,
            "civic_info": civic_info
        }


    finally:

        # ------------------------------------------
        # Delete temporary image
        # ------------------------------------------

        if os.path.exists(file_path):
            os.remove(file_path)


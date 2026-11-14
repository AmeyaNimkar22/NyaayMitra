
import torch
import torch.nn as nn
from torchvision.models import mobilenet_v3_large
from torchvision.models import MobileNet_V3_Large_Weights
from PIL import Image
import os


# --------------------------------------------------
# Model configuration
# --------------------------------------------------

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "mobilenet_v3_large_nyaaymitra_final.pth"
)

device = torch.device("cpu")


# --------------------------------------------------
# Load trained MobileNetV3-Large model
# --------------------------------------------------

checkpoint = torch.load(
    MODEL_PATH,
    map_location=device
)

classes = checkpoint["classes"]

model = mobilenet_v3_large(weights=None)

in_features = model.classifier[-1].in_features

model.classifier[-1] = nn.Linear(
    in_features,
    len(classes)
)

model.load_state_dict(checkpoint["model_state_dict"])

model.to(device)
model.eval()


# --------------------------------------------------
# Image preprocessing
# --------------------------------------------------

weights = MobileNet_V3_Large_Weights.DEFAULT

preprocess = weights.transforms()


# --------------------------------------------------
# Image classification function
# --------------------------------------------------

def classify_image(image_path: str):

    image = Image.open(image_path).convert("RGB")

    input_tensor = preprocess(image).unsqueeze(0)
    input_tensor = input_tensor.to(device)

    with torch.no_grad():
        output = model(input_tensor)

    probabilities = torch.nn.functional.softmax(
        output[0],
        dim=0
    )

    predicted_index = torch.argmax(probabilities).item()

    predicted_class = classes[predicted_index]

    confidence = probabilities[predicted_index].item() * 100

    return {
        "class": predicted_class,
        "confidence": round(confidence, 2)
    }


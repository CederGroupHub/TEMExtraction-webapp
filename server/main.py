import os
import io
import re
import base64
from utils import *
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI()

class Base64(BaseModel):
    base64: str

@app.post("/segment/")
async def segment(f: Base64):
    image_data = remove_base64_prefix(f)
    im = Image.open(base64_to_bytes(image_data)).convert('RGB')
    im.save('Mask_RCNN/images/test_img.jpg')

    base64_string, width, height = run_segmentation()

    os.remove("Mask_RCNN/images/test_img.jpg")
    os.remove("Mask_RCNN/visualizations/inference_image.png")

    return {'base64': base64_string, 'width': width, 'height': height}

@app.post("/detect/")
async def object_detect(f: Base64):
    image_data = remove_base64_prefix(f)
    im = Image.open(base64_to_bytes(image_data)).convert('RGB')
    im.save('label_scale_bar_detector/images/test_img.jpg')

    base64_string, width, height = run_object_detection()

    os.remove("label_scale_bar_detector/images/test_img.jpg")
    os.remove("label_scale_bar_detector/localizer/darknet/predictions.jpg")

    return {'base64': base64_string, 'width': width, 'height': height}

if os.environ.get("COVID_API_CORS_DEBUG", "False") == "True":
    print('Warning: sending CORS headers to allow debugging, this should not happen in production mode.')

    origins = [
        "http://localhost",
        "http://localhost:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

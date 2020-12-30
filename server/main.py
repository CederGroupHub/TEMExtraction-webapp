import os
import io
import re
import base64

from PIL import Image
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from utils import remove_base64_prefix, baseheight, get_base64_str, base64_to_bytes, run_segmentation, run_OCR, run_object_detection, measure_bar, cleanup
from size_measurement import main

app = FastAPI()

class Base64(BaseModel):
    base64: str

class ScaleReadings(BaseModel):
    bar_width: int
    digit: int
    unit: str

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
    text, digit, unit = run_OCR()
    bar_width = measure_bar()

    cleanup()

    return {'base64': base64_string, 'width': width, 'height': height, 'OCR': {'label': text, 'digit': digit, 'unit': unit, 'bar_width': bar_width}}

@app.post("/plot-size/")
async def plot(f: ScaleReadings):
    main('Mask_RCNN/masks', 'Mask_RCNN/object_classes/class_ids.json', f.bar_width, f.digit, f.unit)
    img = Image.open("./plot/plot.jpg")
    base64_string, width = get_base64_str(img)
    return {'base64': base64_string, 'width': width, 'height': baseheight}

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

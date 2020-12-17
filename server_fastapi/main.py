import os
import io
import re
import base64
from utils import run_segmentation
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI()

class Base64(BaseModel):
    base64: str

@app.post("/image-upload/")
async def upload_image(f: Base64):
    image_data = re.sub('^data:image/.+;base64,', '', f.base64)
    im = Image.open(io.BytesIO(base64.b64decode(image_data)))
    im.convert('RGB').save('Mask_RCNN/images/test_img.jpg')

    base64_string = run_segmentation()

    return {'base64': base64_string}

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

# Setup Instructions

1) Download [Mask RCNN weights](https://drive.google.com/file/d/1Sz6-Sc80WX6yTrledzD2Mqi9ajFxSU_W/view?usp=sharing) and place it in `server/Mask_RCNN/logs/tem`.
2) Download [SRCNN weights](https://drive.google.com/file/d/1zmBxzC9SVJm9vciOPLbKzVIVlH09UZtW/view?usp=sharing) and place it in `server/label_scale_bar_detector/OCR/SRCNN-pytorch/weights/`.
3) Download [Darknet weights](https://drive.google.com/file/d/1CR0chidAN8x7LLWcLHYz4QR7pHfsQB8-/view?usp=sharing) and place it in `server/label_scale_bar_detector/localizer/darknet/backup`.

# Installation

Run `conda env create -f environment.yml`.

# Running the app

1) `cd client && npm start`.
2) `cd server && uvicorn main:app --reload`.

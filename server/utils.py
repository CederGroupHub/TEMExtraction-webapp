import io
import re
import os
import json
import subprocess
import base64
import contextlib

from io import BytesIO
from PIL import Image
from label_scale_bar_detector.localizer import detect
from label_scale_bar_detector.OCR import read

baseheight = 500

def create_dir(path):
    if not os.path.isdir(path):
        os.mkdir(path)

def remove_base64_prefix(f):
    image_data = re.sub('^data:image/.+;base64,', '', f.base64)
    return image_data

def base64_to_bytes(f):
    return io.BytesIO(base64.b64decode(f))

def get_base64_str(img):
    wpercent = (baseheight/float(img.size[1]))
    wsize = int((float(img.size[0])*float(wpercent)))
    img = img.resize((wsize, baseheight), Image.ANTIALIAS)

    buffered = BytesIO()
    img.convert('RGB').save(buffered, format="JPEG")
    img_str = 'data:image/png;base64,' + str(base64.b64encode(buffered.getvalue()).decode())
    return img_str, wsize

def run_segmentation():
    os.chdir('./Mask_RCNN')
    subprocess.check_call('python samples/TEM/TEM.py inferone'
                            ' --model {}'
                            ' --image_path {}'.format(
                                './logs/tem/mask_rcnn_tem_0200.h5',
                                'images/test_img.jpg'),
                                shell=True
                            )
    os.chdir('../')

    img = Image.open('./Mask_RCNN/visualizations/inference_image.png')
    img_str, wsize = get_base64_str(img)

    return img_str, wsize, baseheight

def run_object_detection():
    detect('label_scale_bar_detector/images/')
    img = Image.open('./label_scale_bar_detector/localizer/darknet/predictions.jpg')
    img_str, wsize = get_base64_str(img)

    return img_str, wsize, baseheight

def run_OCR():
    crop_scales('label_scale_bar_detector/images', 'label_scale_bar_detector/localizer/darknet/result.json', 'label_scale_bar_detector')
    # Read labels and scales
    labels_path = "label_scale_bar_detector/label"
    scales_path = "label_scale_bar_detector/scale"
    _, text = read_OCR_from_folder('label', labels_path, 'label_scale_bar_detector')
    _, digit, unit = read_OCR_from_folder('scale', scales_path, 'label_scale_bar_detector')
    return text, digit, unit

def measure_bar():
    width = None
    for f in os.listdir("label_scale_bar_detector/bar"):
        img = Image.open(os.path.join("label_scale_bar_detector/bar", f))
        width, height = img.size
    return width

def crop_scales(path_img, path_ann, save_dir):
    annotations = json.load(open(path_ann))
    types = ['bar', 'scale', 'label']

    for ann in annotations:
        name = ann['filename'].split('/')[2]
        for tp in types:
            output_dir = os.path.join(save_dir, tp)
            create_dir(output_dir)
            objects = [obj for obj in ann['objects'] if obj["name"] == tp]
            if len(objects) == 0:
                continue
            elif len(objects) == 1:
                coords = objects[0]['relative_coordinates']
                confidence = objects[0]['confidence']
            else:
                confidence = 0
                highest_confidence_index = 0
                for i, obj in enumerate(objects):
                    confidence_new = obj['confidence']
                    if confidence_new > confidence:
                        highest_confidence_index = i
                coords = objects[highest_confidence_index]['relative_coordinates']
                confidence = objects[highest_confidence_index]['confidence']
            # Crop out bbox and save in path_save
            img = Image.open(os.path.join(path_img, name))
            w, h = img.size
            left = (coords['center_x'] - coords['width']/2) * w
            right = (coords['center_x'] + coords['width']/2) * w
            top = (coords['center_y'] - coords['height']/2) * h
            bottom = (coords['center_y'] + coords['height']/2) * h

            img_cropped = img.crop((left, top, right, bottom))
            img_cropped.save(os.path.join(output_dir, str(tp) + '_' + str(name)))

def read_OCR_from_folder(tp, src_path, dest_path):
    # Run OCR on the extracted labels
    if tp == 'scale':
        columns = ['filename', 'digit', 'unit']
        fname = "scales.csv"
        create_dir(os.path.join(dest_path, 'Scales_bicubic'))
        create_dir(os.path.join(dest_path, 'Scales_SRCNN'))
    elif tp == 'label':
        columns = ['filename', 'label']
        fname = "labels.csv"
        create_dir(os.path.join(dest_path, 'Labels_bicubic'))
        create_dir(os.path.join(dest_path, 'Labels_SRCNN'))

    ctr_total = 0
    ctr = 0
    data = []
    for f in os.listdir(src_path):
        ctr_total += 1

        if tp == 'label':
            text = read(tp, os.path.join(src_path, f))
            if text:
                data.append([f, text])
                ctr += 1
        elif tp == 'scale':
            digit, unit = read(tp, os.path.join(src_path, f))
            if digit and unit:
                data.append([f, digit, unit])
                ctr += 1

        if ctr != 0 and ctr % 10 == 0:
            print("Labels extracted:", ctr)
            print("Labels seen:", ctr_total)
            print("Extraction rate:", float(ctr) / ctr_total * 100, '%')
    if len(data) == 0:
        return tuple([None for i in range(len(columns))])
    return tuple(data[0]) # if multiple images in folder, change this

def cleanup():
    with contextlib.suppress(FileNotFoundError):
        os.remove("label_scale_bar_detector/images/test_img.jpg")
        os.remove("label_scale_bar_detector/localizer/darknet/predictions.jpg")
        os.remove("label_scale_bar_detector/bar/bar_test_img.jpg")
        os.remove("label_scale_bar_detector/scale/scale_test_img.jpg")
        os.remove("label_scale_bar_detector/label/label_test_img.jpg")

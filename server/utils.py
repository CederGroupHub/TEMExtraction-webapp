import io
import re
import os
import subprocess
import base64
from io import BytesIO
from PIL import Image
from label_scale_bar_detector.localizer import detect

baseheight = 500

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
                                './logs/tem/mask_rcnn_tem_0295.h5',
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

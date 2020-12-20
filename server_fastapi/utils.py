import io
import re
import os
import subprocess
import base64
from io import BytesIO
from PIL import Image

basewidth = 900

def remove_base64_prefix(f):
    image_data = re.sub('^data:image/.+;base64,', '', f.base64)
    return image_data

def base64_to_bytes(f):
    return io.BytesIO(base64.b64decode(f))

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
    wpercent = (basewidth/float(img.size[0]))
    hsize = int((float(img.size[1])*float(wpercent)))
    img = img.resize((basewidth, hsize), Image.ANTIALIAS)

    buffered = BytesIO()
    img.convert('RGB').save(buffered, format="JPEG")
    img_str = 'data:image/png;base64,' + str(base64.b64encode(buffered.getvalue()).decode())

    return img_str, basewidth, hsize

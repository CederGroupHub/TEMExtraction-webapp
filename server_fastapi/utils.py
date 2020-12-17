import os
import subprocess
import base64

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
    with open("./Mask_RCNN/visualizations/inference_image.png", "rb") as img_file:
        base64_string = 'data:image/png;base64,' + str(base64.b64encode(img_file.read()).decode())
    return base64_string

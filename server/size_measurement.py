import os
import math
import json
import numpy as np
import pandas as pd
from skimage.measure import find_contours
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon


def centre_of_mass(img_np):
    x = 0.0
    y = 0.0
    total = 0.0
    for i in range(img_np.shape[0]):
        for j in range(img_np.shape[1]):
            greater_than_zero = int(img_np[i][j] > 0)
            x += i * greater_than_zero
            y += j * greater_than_zero
            total += greater_than_zero
    return (int(x / total), int(y / total))

def get_contours(mask):
    # Mask Polygon
    # Pad to ensure proper polygons for masks that touch image edges.
    padded_mask = np.zeros(
        (mask.shape[0] + 2, mask.shape[1] + 2), dtype=np.uint8)
    padded_mask[1:-1, 1:-1] = mask
    contours = find_contours(padded_mask, 0.5)
    return contours

def points_distance(x1, y1, x2, y2):
    return math.sqrt((x1 - x2)**2 + (y1 - y2)**2)

def measure_rod_size(mask):
    centre_x, centre_y = centre_of_mass(mask)
    # _, ax = plt.subplots(1, figsize=(12, 12))

    # plt.imshow(mask)
    # plt.show()

    contours = get_contours(mask)
    distances = []
    for point in contours[0]:
        x1 = point[0]
        y1 = point[1]
        distances.append((x1, y1, points_distance(x1, y1, centre_x, centre_y)))
    #     plt.plot([y1, centre_y], [x1, centre_x], marker='o')
    # plt.imshow(mask)
    # plt.show()
    distances.sort(key=lambda x: x[2], reverse=True)
    # plt.plot([distances[0][1], centre_y], [distances[0][0], centre_x], marker='o')
    # plt.show()
    # plt.imshow(mask)
    # plt.plot([distances[1][1], centre_y], [distances[1][0], centre_x], marker='o')
    # plt.show()
    # try:
    # mean_length = (distances[0] + distances[1]) / 2
    # except:
        # return None
    return (distances[0][2] * 2, distances[-1][2] * 2)

def measure_cube_size(mask):
    centre_x, centre_y = centre_of_mass(mask)
    # _, ax = plt.subplots(1, figsize=(12, 12))

    # plt.imshow(mask)
    # plt.show()

    contours = get_contours(mask)
    distances = []
    for point in contours[0]:
        x1 = point[0]
        y1 = point[1]
        distances.append((x1, y1, points_distance(x1, y1, centre_x, centre_y)))
    #     plt.plot([y1, centre_y], [x1, centre_x], marker='o')
    # plt.imshow(mask)
    # plt.show()
    distances.sort(key=lambda x: x[2])
    # plt.plot([distances[0][1], centre_y], [distances[0][0], centre_x], marker='o')
    # plt.show()
    # try:
    # mean_centre_to_side = (distances[0] + distances[1] + distances[2] + distances[3]) / 4
    # except:
        # return None
    return distances[0][2] * 2

def measure_triangle_size(mask):
    centre_x, centre_y = centre_of_mass(mask)
    # _, ax = plt.subplots(1, figsize=(12, 12))

    # plt.imshow(mask)
    # plt.show()

    contours = get_contours(mask)
    distances = []
    for point in contours[0]:
        x1 = point[0]
        y1 = point[1]
        # distances.append(points_distance(x1, y1, centre_x, centre_y))
        distances.append((x1, y1, points_distance(x1, y1, centre_x, centre_y)))
    #     plt.plot([y1, centre_y], [x1, centre_x], marker='o')
    plt.imshow(mask)
    # plt.show()
    distances.sort(key=lambda x: x[2], reverse=True)
    plt.plot([distances[-1][1], centre_y], [distances[-1][0], centre_x], marker='o')
    plt.show()
    #     plt.plot([y1, centre_y], [x1, centre_x], marker='o')
    # plt.imshow(mask)
    # plt.show()
    # distances.sort(reverse=True)
    # try:
    # mean_centre_to_vertex = (distances[0] + distances[1] + distances[2]) / 3
    # mean_centre_to_side = (distances[-1] + distances[-2] + distances[-3]) / 3
    # except:
        # return None

    return distances[0][2] + distances[-1][2]

def measure_particle_size(mask):
    centre_x, centre_y = centre_of_mass(mask)
    # _, ax = plt.subplots(1, figsize=(12, 12))

    # Visualize the centres to verify that they are correct
    for point_x in range(1):
        for point_y in range(1):
            mask[centre_x + point_x][centre_y + point_y] = 0
    # plt.imshow(mask)
    # plt.show()

    contours = get_contours(mask)
    # for verts in contours:
    #     # Subtract the padding and flip (y, x) to (x, y)
    #     verts = np.fliplr(verts) - 1
    #     p = Polygon(verts, facecolor="none")
    #     ax.add_patch(p)

    distances = []
    for point in contours[0]:
        x1 = point[0]
        y1 = point[1]
        distances.append(points_distance(x1, y1, centre_x, centre_y))
    #     plt.plot([y1, centre_y], [x1, centre_x], marker='o')
    # plt.imshow(mask)
    # plt.show()
    return sum(distances)/len(distances) * 2

def plot_shape(sizes_list):
    def plot(x, xlabel, title):
        plt.hist(x, density=True, bins=30)  # density=False would make counts
        plt.ylabel("Frequency")
        plt.xlabel(xlabel)
        plt.title(title)
        plt.show()

    if len(sizes_list["sphere"]["diameter"]) > 0:
        plot(sizes_list["sphere"]["diameter"], "Diameter (pixels)", "Sphere")
    if len(sizes_list["rod"]["length"]) > 0:
        plot(sizes_list["rod"]["length"], "Length (pixels)", "Rod (Length)")
    if len(sizes_list["rod"]["width"]) > 0:
        plot(sizes_list["rod"]["width"], "Width (pixels)", "Rod (Width)")
    if len(sizes_list["cube"]["side"]) > 0:
        plot(sizes_list["cube"]["side"], "Side length (pixels)", "Cube")
    if len(sizes_list["triangle"]["height"]) > 0:
        plot(sizes_list["triangle"]["height"], "Height (pixels)", "Triangle")

def main(masks_dir, class_ids_path):
    class_ids_all = json.load(open(class_ids_path))
    # if os.path.exists("sizes.json"):
    #     sizes_json = json.load(open("sizes.json"))
    # else:
    #     sizes_json = {}

    for i, f in enumerate(os.listdir(masks_dir)):
        masks = np.load(os.path.join(masks_dir, f))
        class_ids = class_ids_all[f.replace(".npy", "")]
        sizes_list = {
            'rod': {
                'length': [],
                'width': [],
            },
            'sphere': {
                'diameter': []
            },
            'triangle': {
                'height': []
            },
            'cube': {
                'side': []
            }
        }
        for i, class_id in enumerate(class_ids):
            if (masks[:, :, i] > 0).sum() == 0:
                print("skipping")
                continue
            if class_id == 1:
                size = measure_particle_size(masks[:, :, i])
                sizes_list['sphere']['diameter'].append(size)
            elif class_id == 2:
                length, width = measure_rod_size(masks[:, :, i])
                sizes_list['rod']['length'].append(length)
                sizes_list['rod']['width'].append(width)
            elif class_id == 3:
                size = measure_cube_size(masks[:, :, i])
                sizes_list['cube']['side'].append(size)
            elif class_id == 4:
                size = measure_triangle_size(masks[:, :, i])
                sizes_list['triangle']['height'].append(size)
            # sizes_list.append(size)
            # print(sizes_list)
        # sizes_json[f.replace(".npy", "")] = sizes_list
        # if i % 1 == 0 and i != 0:
        #     with open('sizes.json', 'w') as outfile:
        #         json.dump(sizes_json, outfile)
        # if i % 20 == 0 and i != 0:
        #     print(i, " images completed!")
        plot_shape(sizes_list)

if __name__ == '__main__':
    main("../../particle_segmentation/Mask_RCNN/masks",
         "../../particle_segmentation/Mask_RCNN/object_classes/class_ids.json")

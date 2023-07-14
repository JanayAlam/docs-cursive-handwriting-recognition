#%% importing
import os
import cv2

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from skimage.transform import hough_line, hough_line_peaks
from skimage.transform import rotate
from scipy.stats import mode

#%% constents
raw_dataset_path = './data/raw-data'
new_dataset_path = './data/training'

#%%
def extract_name(name: str) -> str:
    splited_arr = name.split(' ')
    if ('mg' in splited_arr[-1]):
        return splited_arr[-2]
    else:
        return splited_arr[-1]
    
#%%
def get_sharp_img(edges):
    sharpen_filter = np.array([
        [0, -1, 0],
        [-1, 8, -1],
        [0, -1, 0],
    ])
    sharp_img = cv2.filter2D(edges, ddepth=-1, kernel=sharpen_filter)
    return sharp_img

def skew_angle_hough_transform(edges):
    # Classic straight-line Hough transform between 0.1 - 180 degrees.
    tested_angles = np.deg2rad(np.arange(0.1, 180.0))
    h, theta, d = hough_line(edges, theta=tested_angles)
    
    # find line peaks and angles
    accum, angles, dists = hough_line_peaks(h, theta, d)
    
    # round the angles to 2 decimal places and find the most common angle.
    most_common_angle = mode(np.around(angles, decimals=2), keepdims=True)[0]
    
    # convert the angle to degree for rotation.
    skew_angle = np.rad2deg(most_common_angle - np.pi/2)
    
    if -10 > skew_angle[0] or skew_angle[0] > 10:
        skew_angle[0] = 0
    
    return skew_angle[0]

def remove_noise(img):
    return cv2.erode(img, kernel=(5, 5))

def img_preprocessing(img_dir: str):
    img = cv2.imread(img_dir)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray_img = cv2.GaussianBlur(gray_img, ksize=(3, 3), sigmaX=1, sigmaY=1)
    edges = cv2.Laplacian(gray_img, ddepth=-1)
    
    sharp_img = get_sharp_img(edges)
    denoised_img = remove_noise(sharp_img)
    skew_angle = skew_angle_hough_transform(edges)
    rotated_img = rotate(denoised_img, skew_angle)

    return rotated_img

#%% reading and writing data
df_dict = {
    'image': [],    
    'label': []
}

for f_name in os.listdir(raw_dataset_path):
    counter = 1
    imgs_folder = os.path.join(raw_dataset_path, f_name)
    for img_path in os.listdir(imgs_folder):
        new_name = f'{counter}_{extract_name(f_name)}.png'
        src = os.path.join(raw_dataset_path, f_name, img_path)
        dest = os.path.join(new_dataset_path, 'images', new_name)
        counter += 1
        
        new_img = img_preprocessing(src)
        
        plt.imsave(dest, new_img, cmap='gray')
        df_dict['image'].append(new_name)
        df_dict['label'].append(f_name)

#%%
df = pd.DataFrame(data=df_dict)
print(df.head())

#%%
df.to_csv(f'{new_dataset_path}/metadata.csv', index=False)

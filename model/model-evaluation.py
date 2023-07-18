#%%
import os
import cv2

import numpy as np
import pandas as pd
from PIL import Image
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics import confusion_matrix, classification_report
from keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator

#%%
df = pd.read_csv('./data/training/metadata.csv')
print(df.head())

#%%
model_path = './save_models/model_fold_1.h5'
model = load_model(model_path, compile=False)

#%%
datagen = ImageDataGenerator(rescale=1./255)
dataset = datagen.flow_from_dataframe(dataframe=df,
            directory='./data/training/images',
            x_col='image', y_col='label',
            class_mode='categorical',
            target_size=(72, 256),
            batch_size=32)

label_map = (dataset.class_indices)
print([key for key in label_map])

y_true = dataset.classes

#%%
def map_idx_to_class(idx: int, dataset=dataset):
    label_map = (dataset.class_indices)
    class_arr = [key for key in label_map]
    return class_arr[idx]

#%%
y_true_list = []
y_pred_list = []

for i in range(len(df)):
    image_name = df.iloc[i, 0]
    label = df.iloc[i, 1]
    img = np.array(Image.open(f'./data/training/images/{image_name}').convert('RGB').resize((256, 72))) / 255
    
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    
    predictions = model.predict(img_array, verbose=0)
    y_true_list.append(label)
    y_pred_list.append(map_idx_to_class(np.argmax(predictions)))

#%%
print(len(y_true_list))
print(len(y_pred_list))

#%%
result_df = pd.DataFrame(data={
    'y_true': y_true_list,
    'y_pred': y_pred_list
})

print(result_df.head())

#%%
result_df.to_csv('./data/model_result.csv', index=False)

#%%
conf_matrix = confusion_matrix(result_df['y_true'], result_df['y_pred'])
print(conf_matrix)

#%%
plt.figure(figsize=(8,8))
sns.set(font_scale = 1.5)

ax = sns.heatmap(
    conf_matrix, # confusion matrix 2D array 
    annot=True, # show numbers in the cells
    fmt='d', # show numbers as integers
    cbar=False, # don't show the color bar
    cmap='flag', # customize color map
    vmax=175 # to get better color contrast
)

ax.set_xlabel('Predicted', labelpad=20)
ax.set_ylabel('Actual', labelpad=20)
plt.show()

#%%
print(classification_report(result_df['y_true'], result_df['y_pred'], digits=21))

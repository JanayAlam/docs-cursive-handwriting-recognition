import cv2
import matplotlib.pyplot as plt

data_dir = './data/raw-data'

images = [
    {
     'name': 'Tab. Afenac 50mg',
     'path': r'D:\projects\docs-cursive-handwriting-recognition\model-v2\data\raw-data\Tab. Afenac 50mg\2222.png'
    },
    {
     'name': 'Tab. Fixal 120mg',
     'path': r'D:\projects\docs-cursive-handwriting-recognition\model-v2\data\raw-data\Tab. Fixal 120mg\1111111.png'
    },
    {
     'name': 'Tab. Napa Extend 665mg',
     'path': r'D:\projects\docs-cursive-handwriting-recognition\model-v2\data\raw-data\Tab. Napa Extend 665mg\000032.png'
    },
    {
     'name': 'Tab. Naprosyn 500mg',
     'path': r'D:\projects\docs-cursive-handwriting-recognition\model-v2\data\raw-data\Tab. Naprosyn 500mg\103.png'
    },
    {
     'name': 'Tab. Osartil 100mg',
     'path': r'D:\projects\docs-cursive-handwriting-recognition\model-v2\data\raw-data\Tab. Osartil 100mg\2803.png'
    },
    {
     'name': 'Tab. Resva 5mg',
     'path': r'D:\projects\docs-cursive-handwriting-recognition\model-v2\data\raw-data\Tab. Resva 5mg\000011.png'
    },
]

plt.figure(figsize=(15, 8))
for i, img_dict in enumerate(images):
    img = cv2.imread(img_dict['path'])
    
    plt.subplot(2, 3, i+1)
    plt.imshow(img, cmap='gray')
    plt.title(img_dict['name'])
    plt.axis('off')
    plt.grid(False)

plt.savefig('./figures/sample-data.png')
plt.show()
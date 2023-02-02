import Cropper from 'cropperjs';
import { useEffect, useRef, useState } from 'react';
import styles from './image-cropper.module.css';

const ImageCropper = ({ image }) => {
    const [imgDestination, setImgDestination] = useState(null);
    const imageEl = useRef();

    useEffect(() => {
        const cropper = new Cropper(imageEl.current, {
            zoomable: true,
            scalable: true,
            aspectRatio: 550 / 150,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                setImgDestination(canvas.toDataURL('image/png'));
            },
        });
    });

    return (
        <div className={styles.container}>
            <div>
                <img
                    className={styles.image}
                    ref={imageEl}
                    src={image}
                    height="500px"
                />
            </div>
            {imgDestination && (
                <img
                    className={styles.imgPreview}
                    src={imgDestination}
                    alt="Destination"
                    height="500px"
                />
            )}
        </div>
    );
};

export default ImageCropper;

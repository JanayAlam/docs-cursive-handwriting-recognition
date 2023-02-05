import DoneIcon from '@mui/icons-material/Done';
import { Grid } from '@mui/material';
import Cropper from 'cropperjs';
import { useEffect, useRef, useState } from 'react';
import ButtonComponent from '../ui/button';
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
            <Grid container>
                <Grid xl={7} md={7} sm={12} xs={12}>
                    <img className={styles.image} ref={imageEl} src={image} />
                </Grid>
                <Grid xl={5} md={5} sm={12} xs={12} pl={3} pr={3}>
                    <ul className={styles.helperTextHolder}>
                        <li>Please crop to the medicine name only.</li>
                        <li>Do not include the routine portion.</li>
                    </ul>
                    {imgDestination && (
                        <div className={styles.previewHolder}>
                            <div className={styles.previewTitle}>Preview</div>
                            <img
                                className={styles.previewImage}
                                src={imgDestination}
                                alt="Destination"
                            />
                            <ButtonComponent
                                variant="contained"
                                onClickHandler={() => {}}
                                size="small"
                                styles={{
                                    width: '100%',
                                }}
                            >
                                <DoneIcon fontSize="small" />{' '}
                                <span style={{ marginLeft: '5px' }}>Done</span>
                            </ButtonComponent>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default ImageCropper;

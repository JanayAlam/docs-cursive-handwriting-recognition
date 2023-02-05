import DoneIcon from '@mui/icons-material/Done';
import { Grid } from '@mui/material';
import Cropper from 'cropperjs';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCroppedPhoto } from '../../store/reducers/photos-slice';
import { pushNotification } from '../../store/reducers/ui-slice';
import ButtonComponent from '../ui/button';
import styles from './image-cropper.module.css';

const ImageCropper = ({ image, handleModalClose }) => {
    const dispatch = useDispatch();

    const [imgDestination, setImgDestination] = useState(null);
    const imageEl = useRef();

    const insertCroppedImage = () => {
        if (!imgDestination) {
            dispatch(
                pushNotification({
                    text: 'Cropped image not found',
                    category: 'error',
                })
            );
            return;
        }
        dispatch(addCroppedPhoto(imgDestination));
        handleModalClose();
        dispatch(
            pushNotification({
                text: 'Image added',
                category: 'success',
            })
        );
    };

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
                                onClickHandler={insertCroppedImage}
                                size="small"
                                styles={{
                                    width: '100%',
                                }}
                            >
                                <DoneIcon fontSize="small" className="mr-05" />
                                Done
                            </ButtonComponent>
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

ImageCropper.propTypes = {
    image: PropTypes.any.isRequired,
    handleModalClose: PropTypes.func.isRequired,
};

export default ImageCropper;

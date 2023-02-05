import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import {
    Box,
    Container,
    Divider,
    IconButton,
    Modal,
    Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeBasePhoto } from '../../store/reducers/photos-slice';
import { pushNotification } from '../../store/reducers/ui-slice';
import ImageCropper from '../image-cropper';
import ButtonComponent from '../ui/button';
import styles from './base-photo-holder.module.css';

const BasePhotoHolder = ({ basePhoto }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [onCropModal, setOnCropModal] = useState(false);

    const handleOnCropModalOpen = () => {
        setOnCropModal(true);
    };

    const handleOnCropModalClose = () => {
        setOnCropModal(false);
    };

    const clearBaseImage = () => {
        dispatch(removeBasePhoto());
        navigate('/');
        dispatch(
            pushNotification({
                text: 'The prescription has been removed',
                category: 'info',
            })
        );
    };

    return (
        <Container maxWidth="xl">
            <div className={styles.buttonContainer}>
                <ButtonComponent
                    category="primary"
                    onClickHandler={handleOnCropModalOpen}
                    size="small"
                >
                    <CropIcon fontSize="small" className="mr-05" /> Crop Image
                </ButtonComponent>
                <ButtonComponent
                    category="error"
                    onClickHandler={clearBaseImage}
                    size="small"
                >
                    <ClearIcon fontSize="small" className="mr-05" /> Clear Image
                </ButtonComponent>
            </div>
            <div style={{ textAlign: 'center' }}>
                <img
                    src={basePhoto}
                    alt="Selected prescription"
                    className={styles.baseImage}
                />
            </div>

            <Modal
                open={onCropModal}
                onClose={handleOnCropModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.cropModal}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>
                            Crop the Prescription
                        </h2>
                        <Tooltip title="Cancel" arrow>
                            <IconButton onClick={handleOnCropModalClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Divider sx={{ marginBottom: 1 }} />
                    <ImageCropper
                        image={basePhoto}
                        handleModalClose={handleOnCropModalClose}
                    />
                </Box>
            </Modal>
        </Container>
    );
};

BasePhotoHolder.propTypes = {
    basePhoto: PropTypes.any.isRequired,
};

export default BasePhotoHolder;

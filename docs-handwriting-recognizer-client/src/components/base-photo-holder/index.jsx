import ClearIcon from '@mui/icons-material/Clear';
import CropIcon from '@mui/icons-material/Crop';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonComponent from '../ui/button';
import styles from './base-photo-holder.module.css';

const BasePhotoHolder = ({ basePhoto }) => {
    return (
        <Container maxWidth="xl">
            <div className={styles.buttonContainer}>
                <ButtonComponent
                    category="primary"
                    onClickHandler={() => {}}
                    size="small"
                >
                    <CropIcon fontSize='small' className='mr-05' /> Crop Image
                </ButtonComponent>
                <ButtonComponent
                    category="error"
                    onClickHandler={() => {}}
                    size="small"
                >
                    <ClearIcon fontSize='small' className='mr-05' /> Clear Image
                </ButtonComponent>
            </div>
            <div style={{ textAlign: 'center' }}>
                <img
                    src={basePhoto}
                    alt="Selected prescription"
                    className={styles.baseImage}
                />
            </div>
        </Container>
    );
};

BasePhotoHolder.propTypes = {
    basePhoto: PropTypes.any.isRequired,
};

export default BasePhotoHolder;

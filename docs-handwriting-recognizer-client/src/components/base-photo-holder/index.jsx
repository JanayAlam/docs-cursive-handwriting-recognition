import { Container, Divider } from '@mui/material';
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
                    Crop Image
                </ButtonComponent>
                <ButtonComponent
                    category="error"
                    onClickHandler={() => {}}
                    size="small"
                >
                    Clear Image
                </ButtonComponent>
            </div>
            <Divider className={styles.divider} />
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

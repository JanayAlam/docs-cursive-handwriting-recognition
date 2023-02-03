import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonComponent from '../ui/button';

const BasePhotoHolder = ({ basePhoto }) => {
    return (
        <Container maxWidth="xl">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 5,
                    marginBottom: '0.5rem',
                }}
            >
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
            <div style={{ textAlign: 'center' }}>
                <img
                    src={basePhoto}
                    alt="Selected prescription"
                    style={{ width: '100%' }}
                />
            </div>
        </Container>
    );
};

BasePhotoHolder.propTypes = {
    basePhoto: PropTypes.any.isRequired,
};

export default BasePhotoHolder;

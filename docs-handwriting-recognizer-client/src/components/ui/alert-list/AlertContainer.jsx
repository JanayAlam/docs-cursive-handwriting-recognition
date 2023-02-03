import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

const AlertContainer = ({ id, text, category, clearNotification }) => {
    return (
        <div
            style={{
                margin: '0.5rem 0',
                cursor: 'pointer',
            }}
            onClick={() => clearNotification(id)}
        >
            <Alert severity={category} color={category}>
                {text}
            </Alert>
        </div>
    );
};

AlertContainer.propTypes = {
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};

export default AlertContainer;

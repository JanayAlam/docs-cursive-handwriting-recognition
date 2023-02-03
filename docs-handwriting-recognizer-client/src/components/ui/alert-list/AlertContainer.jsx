import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

const AlertContainer = ({ id, alertText, category, clearNotification }) => {
    return (
        <div
            style={{
                margin: '0.5rem 0',
                cursor: 'pointer',
            }}
            onClick={() => clearNotification(id)}
        >
            <Alert severity={category} color={category}>
                {alertText}
            </Alert>
        </div>
    );
};

AlertContainer.propTypes = {
    alertText: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};

export default AlertContainer;

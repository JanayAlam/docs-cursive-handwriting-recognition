import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

const AlertContainer = ({ alertText, category, timeout }) => {
    return (
        <div
            style={{
                margin: '1rem 0',
                cursor: 'pointer',
            }}
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
    timeout: PropTypes.number,
};

export default AlertContainer;

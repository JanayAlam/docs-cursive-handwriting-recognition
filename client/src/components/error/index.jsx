import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './error.module.css';

const ErrorComponent = ({ statusCode, children }) => {
    return (
        <Container maxWidth="xl" className={styles.container}>
            <h2 className={styles.statusCode}>{statusCode}</h2>
            <div className={styles.errorBody}>{children}</div>
        </Container>
    );
};

ErrorComponent.propTypes = {
    statusCode: PropTypes.number.isRequired,
};

export default ErrorComponent;

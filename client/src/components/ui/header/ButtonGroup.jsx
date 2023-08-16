import { Button } from '@mui/material';
import styles from './header.module.css';

const ButtonGroup = ({ handleMenuClick }) => {
    return (
        <div className={styles.buttonGroup}>
            <Button
                onClick={() => handleMenuClick('medicines')}
                size="small"
                sx={{ mr: '5px' }}
            >
                Medicines
            </Button>
            <Button onClick={() => handleMenuClick('contact')} size="small">
                Contact
            </Button>
        </div>
    );
};

export default ButtonGroup;

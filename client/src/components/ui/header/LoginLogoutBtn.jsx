import { Button } from '@mui/material';
import styles from './header.module.css';

const LoginLogoutBtn = ({ handleMenuClick }) => {
    return (
        <div className={styles.authBtnGroup}>
            <Button sx={{ mr: '5px' }} onClick={() => handleMenuClick('login')} size="small">Login</Button>
            <Button onClick={() => handleMenuClick('register')} size="small">Register</Button>
        </div>
    );
};

export default LoginLogoutBtn;

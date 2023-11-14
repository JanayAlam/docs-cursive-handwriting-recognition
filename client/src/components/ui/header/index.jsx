import { AppBar, Container, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import brandImage from '../../../assets/prescription.png';
import ButtonGroup from './ButtonGroup';
import styles from './header.module.css';

const Header = () => {
    const navigate = useNavigate();

    const handleMenuClick = (pageURL) => {
        navigate(pageURL);
    };

    return (
        <AppBar position="sticky" className={styles.navbar}>
            <Container maxWidth="xl">
                <Toolbar>
                    <div
                        className={styles.brandItems}
                        onClick={() => navigate('/')}
                    >
                        <img src={brandImage} height="35px" />
                        <div className={styles.brandName}>RXDetection</div>
                    </div>
                    <ButtonGroup handleMenuClick={handleMenuClick} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;

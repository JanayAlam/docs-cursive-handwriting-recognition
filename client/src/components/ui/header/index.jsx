import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import brandImage from '../../../assets/prescription.png';
import styles from './header.module.css';
import LoginLogoutBtn from './LoginLogoutBtn';

const Header = () => {
    const [auth, setAuth] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (pageURL) => {
        navigate(pageURL);
        setAnchorEl(null);
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
                    {auth ? (
                        <div>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMenu}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItem
                                    onClick={() => handleMenuClick('profile')}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleMenuClick('login')}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <LoginLogoutBtn handleMenuClick={handleMenuClick} />
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;

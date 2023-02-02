import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import LoginLogoutBtn from './LoginLogoutBtn';

const Header = (props) => {
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
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        PrescribeEasy
                    </Typography>
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

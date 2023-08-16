import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dropzone from '../../components/ui/dropzone';
import { addBasePhoto } from '../../store/reducers/photos-slice';
import { pushNotification } from '../../store/reducers/ui-slice';
import styles from './homepage.module.css';

const Homepage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleImageSelect = (file) => {
        if (!file) {
            dispatch(
                pushNotification({
                    text: 'Please select a image',
                    category: 'error',
                })
            );
            return;
        }
        const ALLOWED_EXT = ['jpg', 'jpeg', 'png'];

        const fileNameArr = file.name.split('.');
        const fileExt = fileNameArr[fileNameArr.length - 1];

        if (!ALLOWED_EXT.includes(fileExt.toLowerCase())) {
            dispatch(
                pushNotification({
                    text: 'File not allowed',
                    category: 'error',
                })
            );
            return;
        }
        dispatch(addBasePhoto(URL.createObjectURL(file)));
        navigate('/image-cropping');
    };

    return (
        <Box className={styles.homepageRoot}>
            <Container maxWidth="xl">
                <Box className={styles.homepageInner}>
                    <Typography
                        variant="h2"
                        component="h2"
                        className={styles.header}
                        sx={{ fontWeight: 'bold' }}
                    >
                        Trust Our Experience
                    </Typography>
                    <Typography
                        className={styles.caption}
                        sx={{ fontSize: '1.2rem' }}
                    >
                        Get started by uploading prescriptions
                    </Typography>
                    <Box sx={{ mt: '1rem' }}>
                        <Dropzone handleSelect={handleImageSelect} />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Homepage;

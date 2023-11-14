import { Grid } from '@mui/material';
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
        <>
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
            <div className={styles.footer}>
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <p>
                                Research:{' '}
                                <b>
                                    Doctors' cursive handwritten prescription
                                    recognition and alternative brands
                                    suggestion
                                </b>
                            </p>
                            <p>
                                Supervisor: <b>Tanni Mittra</b>, Senior Lecturer
                            </p>
                            <p>
                                Authors: <b>Md. Janay Alam</b>,{' '}
                                <b>Najmus Sakib</b>, <b>Afsana Nur Meem</b>,{' '}
                                <b>Lamya Ishrat Nodi</b>, and{' '}
                                <b>Efte Kharul Islam Shinha</b>
                            </p>
                            <Typography variant="body2">
                                Department of Computer Science & Engineering
                                <br />
                                <b>East West University</b>, Dhaka, Bangladesh
                            </Typography>
                        </Grid>
                        <Grid item md={6} sx={{ textAlign: 'right' }}>
                            <p>
                                Technology Used: <b>React JS</b>, <b>Flask</b>,{' '}
                                Tensorflow, Open CV, etc.
                            </p>
                            <p>
                                UI: <b>Material UI</b>
                            </p>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
};

export default Homepage;

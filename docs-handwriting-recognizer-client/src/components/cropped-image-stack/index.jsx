import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Container, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCroppedPhotos } from '../../store/reducers/photos-slice.js';
import ButtonComponent from '../ui/button';
import styles from './cropped-image-stack.module.css';

const CroppedImageStack = ({ basePhoto }) => {
    const croppedPhotos = useSelector(selectCroppedPhotos);

    return (
        <Container maxWidth="xl">
            <div className={styles.buttonContainer}>
                <ButtonComponent
                    category="primary"
                    onClickHandler={() => {}}
                    size="small"
                    styles={{
                        width: '100%',
                    }}
                    variant="contained"
                    disabled={true}
                >
                    <DoneAllIcon fontSize="small" className="mr-05" /> Submit
                </ButtonComponent>
            </div>
            <Stack>
                {croppedPhotos.length > 0 ? (
                    <div
                        onClick={() => console.log('sa')}
                        className={styles.croppedImageHolder}
                    >
                        <img
                            src={basePhoto}
                            alt="Selected prescription"
                            className={styles.image}
                        />
                        <ButtonComponent
                            category="error"
                            onClickHandler={() => {}}
                            size="small"
                            styles={{
                                width: '100%',
                                marginTop: 0,
                            }}
                            variant="outlined"
                        >
                            <DeleteIcon fontSize="small" className="mr-05" />{' '}
                            Delete
                        </ButtonComponent>
                    </div>
                ) : (
                    <Typography mt={2} sx={{ textAlign: 'center', color: '#6C757D' }}>
                        Please crop into the medicine name first.
                    </Typography>
                )}
            </Stack>
        </Container>
    );
};

export default CroppedImageStack;

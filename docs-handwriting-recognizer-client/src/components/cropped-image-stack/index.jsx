import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import dataURLtoFile from '../../assets/utils';
import {
    removeCroppedPhoto,
    selectCroppedPhotos
} from '../../store/reducers/photos-slice';
import { pushNotification } from '../../store/reducers/ui-slice';
import ButtonComponent from '../ui/button';
import styles from './cropped-image-stack.module.css';

const CroppedImageStack = () => {
    const dispatch = useDispatch();
    const croppedPhotos = useSelector(selectCroppedPhotos);

    const removeCroppedImage = (id) => {
        dispatch(removeCroppedPhoto(id));
        dispatch(
            pushNotification({
                text: 'Image removed',
                category: 'info',
            })
        );
    };

    const onSubmitHandler = async () => {        
        const data = new FormData();

        for (let i=0; i<croppedPhotos.length; i++) {
            data.append(`file-${i+1}`, dataURLtoFile(croppedPhotos[i].photo, croppedPhotos[i].id)) 
        }

        const res = await axios.post('http://localhost:8080/api/predict', data);
        console.log(res.data);
    };

    return (
        <Container maxWidth="xl">
            <div className={styles.buttonContainer}>
                <ButtonComponent
                    category="primary"
                    onClickHandler={onSubmitHandler}
                    size="small"
                    styles={{
                        width: '100%',
                    }}
                    variant="contained"
                    disabled={croppedPhotos.length === 0}
                >
                    <DoneAllIcon fontSize="small" className="mr-05" /> Submit
                </ButtonComponent>
            </div>
            <Stack>
                {croppedPhotos.length > 0 ? (
                    <div>
                        {croppedPhotos.map((croppedPhoto) => (
                            <div
                                onClick={() => console.log('sa')}
                                className={styles.croppedImageHolder}
                                key={croppedPhoto.id}
                            >
                                <img
                                    src={croppedPhoto.photo}
                                    alt="Cropped photo"
                                    className={styles.image}
                                />
                                <ButtonComponent
                                    category="error"
                                    onClickHandler={() =>
                                        removeCroppedImage(croppedPhoto.id)
                                    }
                                    size="small"
                                    styles={{
                                        width: '100%',
                                        marginTop: 0,
                                    }}
                                    variant="outlined"
                                >
                                    <DeleteIcon
                                        fontSize="small"
                                        className="mr-05"
                                    />
                                    Delete
                                </ButtonComponent>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Typography
                        mt={2}
                        sx={{ textAlign: 'center', color: '#6C757D' }}
                    >
                        Please crop prescription to the medicine name first.
                    </Typography>
                )}
            </Stack>
        </Container>
    );
};

export default CroppedImageStack;

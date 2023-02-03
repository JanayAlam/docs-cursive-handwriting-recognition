import { Container, Stack } from '@mui/material';
import ButtonComponent from '../ui/button';
import styles from './cropped-image-stack.module.css';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const CroppedImageStack = ({ basePhoto }) => {
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
                    <DoneAllIcon fontSize='small' className='mr-05' /> Submit
                </ButtonComponent>
            </div>
            <Stack>
            <div onClick={() => console.log('sa')} className={styles.croppedImageHolder} title="Remove this image">
                <img
                    src={basePhoto}
                    alt="Selected prescription"
                    style={{ width: '100%', height: '150px' }}
                />
            </div>
            <div onClick={() => console.log('sa')} className={styles.croppedImageHolder} title="Remove this image">
                <img
                    src={basePhoto}
                    alt="Selected prescription"
                    style={{ width: '100%', height: '150px' }}
                />
            </div>
            <div onClick={() => console.log('sa')} className={styles.croppedImageHolder} title="Remove this image">
                <img
                    src={basePhoto}
                    alt="Selected prescription"
                    style={{ width: '100%', height: '150px' }}
                />
            </div>
            </Stack>
        </Container>
    );
};

export default CroppedImageStack;

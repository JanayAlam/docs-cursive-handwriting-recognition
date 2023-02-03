import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dropzone from '../../components/ui/dropzone';

import { useDispatch } from 'react-redux';
import { addBasePhoto } from '../../store/reducers/photos-slice';
import { pushNotification } from '../../store/reducers/ui-slice';

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
        <Container maxWidth="xl">
            <div style={{ marginTop: '1rem' }}>
                <Dropzone handleSelect={handleImageSelect} />
            </div>
        </Container>
    );
};

export default Homepage;

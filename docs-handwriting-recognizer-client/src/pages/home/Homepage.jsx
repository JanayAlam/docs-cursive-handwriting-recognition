import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dropzone from '../../components/ui/dropzone';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AlertContainer from '../../components/ui/alert-container';
import { addBasePhoto } from '../../store/reducers/photos-slice';

const Homepage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [temp, setTemp] = useState(false);

    const handleImageSelect = (file) => {
        if (!file) return;
        const ALLOWED_EXT = ['jpg', 'jpeg', 'png'];

        const fileNameArr = file.name.split('.');
        const fileExt = fileNameArr[fileNameArr.length - 1];

        if (!ALLOWED_EXT.includes(fileExt.toLowerCase())) {
            setTemp(true);
            return;
        }
        dispatch(addBasePhoto(URL.createObjectURL(file)));
        navigate('/image-cropping');
    };

    return (
        <Container maxWidth="xl">
            {temp && (
                <AlertContainer alertText="Unsupported File" category="error" />
            )}
            <div style={{ marginTop: '1rem' }}>
                <Dropzone handleSelect={handleImageSelect} />
            </div>
        </Container>
    );
};

export default Homepage;

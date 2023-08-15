import { Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BasePhotoHolder from '../../components/base-photo-holder';
import CroppedImageStack from '../../components/cropped-image-stack';
import ErrorComponent from '../../components/error';
import ResultHolder from '../../components/result-holder';
import {
    selectBasePhoto,
    selectCroppedPhotos,
} from '../../store/reducers/photos-slice';
import dataURLtoFile from '../../utils/utilsFunctions';

const ImageContainer = () => {
    const basePhoto = useSelector(selectBasePhoto);
    const [results, setResults] = useState(null);
    const croppedPhotos = useSelector(selectCroppedPhotos);

    const onSubmitHandler = async () => {
        const data = new FormData();

        for (let i = 0; i < croppedPhotos.length; i++) {
            data.append(
                `file-${i + 1}`,
                dataURLtoFile(croppedPhotos[i].photo, croppedPhotos[i].id)
            );
        }

        const res = await axios.post('http://localhost:8080/api/predict', data);
        console.log(res.data);
        setResults(res.data);
    };

    return (
        <>
            {basePhoto ? (
                <Container maxWidth="xl">
                    {results ? (
                        results.map((item) => (
                            <>
                                <ResultHolder item={item} />
                            </>
                        ))
                    ) : (
                        <Grid container sx={{ marginTop: '1rem' }}>
                            <Grid item xl={8} md={8} sm={12} xs={12}>
                                <BasePhotoHolder basePhoto={basePhoto} />
                            </Grid>
                            <Grid item xl={4} md={4} sm={12} xs={12}>
                                <CroppedImageStack
                                    onSubmitHandler={onSubmitHandler}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Container>
            ) : (
                <ErrorComponent statusCode={400}>
                    <p style={{ marginBottom: '1rem' }}>
                        No image was selected. Please Go back to homepage and
                        select a prescription.
                    </p>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" size="small">
                            Go to Homepage
                        </Button>
                    </Link>
                </ErrorComponent>
            )}
        </>
    );
};

export default ImageContainer;

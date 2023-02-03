import { Button, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BasePhotoHolder from '../../components/base-photo-holder';
import CroppedImageStack from '../../components/cropped-image-stack';
import ErrorComponent from '../../components/error';
import { selectBasePhoto } from '../../store/reducers/photos-slice';

const ImageContainer = () => {
    const dispatch = useDispatch();
    const basePhoto = useSelector(selectBasePhoto);

    return (
        <>
            {basePhoto ? (
                <Container maxWidth="xl">
                    <Grid container sx={{ marginTop: '1rem' }}>
                        <Grid item xl={8} md={8} sm={12} xs={12}>
                            <BasePhotoHolder basePhoto={basePhoto} />
                        </Grid>
                        <Grid item xl={4} md={4} sm={12} xs={12}>
                            <CroppedImageStack basePhoto={basePhoto} />
                        </Grid>
                    </Grid>
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

import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorComponent from '../../components/error';
import {
    removeBasePhoto,
    selectBasePhoto
} from '../../store/reducers/photos-slice';

const ImageContainer = () => {
    const dispatch = useDispatch();
    const basePhoto = useSelector(selectBasePhoto);

    return (
        <>
            {basePhoto ? (
                <div>
                    <img src={basePhoto} height="150px" />
                    <button onClick={() => dispatch(removeBasePhoto())}>
                        Clear
                    </button>
                </div>
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

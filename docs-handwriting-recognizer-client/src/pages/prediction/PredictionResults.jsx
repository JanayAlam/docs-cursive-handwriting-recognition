import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import ResultHolder from '../../components/result-holder';

import { selectCroppedPhotos } from '../../store/reducers/photos-slice';
import { selectResults } from '../../store/reducers/results-slice';

const PredictionResults = () => {
    const croppedPhotos = useSelector(selectCroppedPhotos);
    const results = useSelector(selectResults);
    if (results.length >= 0) {
        results.forEach((item) => {
            console.log(item)
        })
    }
    return (
        <Container maxWidth="xl" sx={{ marginTop: 2 }}>
            {results.length > 0 &&
                results.map((item) => (
                    <ResultHolder
                        key={item.id}
                        item={item.medicine}
                        label={item.label}
                        medicines={item.alternative_brands}
                    />
                ))}
        </Container>
    );
};

export default PredictionResults;

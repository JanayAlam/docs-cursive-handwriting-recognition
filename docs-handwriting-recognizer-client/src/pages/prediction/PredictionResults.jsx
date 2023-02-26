import {
    Container
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ResultHolder from '../../components/result-holder';
import LoadingScreen from '../../components/ui/loading-screen';
import { selectCroppedPhotos } from '../../store/reducers/photos-slice';

function createData(id, category, medicineName, volume, brandName, price) {
    return { id, category, medicineName, brandName, volume, price };
}


const PredictionResults = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);

    const croppedPhotos = useSelector(selectCroppedPhotos);

    useEffect(() => {
        setTimeout(() => {
            const all_result_objs = croppedPhotos.map((item) => ({
                id: item.id,
                photo: item.photo,
                label: 'Tab. Atova 20mg',
                price: 15.1,
                generic: 'Generic Name',
                brand: 'Aristo Pharmaceutical Ltd.',
                altMedicines: [
                    createData('1', 'Tablet', 'Ecosprin',  '75 mg', 'Aristo Pharmaceuticals Ltd.', 6.0),
                    createData('4', 'SC Injection', 'Ecosprin',  '75 mg', 'ACL Pharmaceuticals Ltd.', 6.0),
                    createData('3', 'Capsule', 'Ecosprin',  '75 mg', 'Aristo Pharmaceuticals Ltd.', 6.0),
                    createData('5', 'Insulin', 'Ecosprin',  '75 mg', 'Beximco Pharmaceuticals Ltd.', 6.0),
                ]
            }));

            setResults(all_result_objs);
            setIsLoading(false);
        }, 1000);
    });

    return (
        <Container maxWidth="xl" sx={{ marginTop: 2 }}>
            {isLoading ? (
                <LoadingScreen numOfLoop={1} />
            ) : (
                results.length > 0 &&
                results.map((item) => (
                    <ResultHolder key={item.id} item={item} medicines={item.altMedicines} />
                ))
            )}
        </Container>
    );
};

export default PredictionResults;

import {
    faBong,
    faCapsules,
    faEyeDropper,
    faPrescriptionBottle,
    faPrescriptionBottleMedical,
    faSyringe,
    faTablets,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';

const getIcon = (category) => {
    switch (category) {
        case 'Tablet':
            return <FontAwesomeIcon icon={faTablets} />;
        case 'Capsule':
            return <FontAwesomeIcon icon={faCapsules} />;
        case 'SC Injection':
            return <FontAwesomeIcon icon={faSyringe} />;
        case 'Insulin':
            return <FontAwesomeIcon icon={faPrescriptionBottle} />;
        case 'Syrup':
            return <FontAwesomeIcon icon={faPrescriptionBottleMedical} />;
        case 'Eye Dropper':
            return <FontAwesomeIcon icon={faEyeDropper} />;
        default:
            return <FontAwesomeIcon icon={faBong} />;
    }
};

const AlternativeMedicineTable = ({ medicines }) => {
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width="1%"></TableCell>
                        <TableCell align="left" width="9%">
                            Category
                        </TableCell>
                        <TableCell align="left" width="25%">
                            Medicine Name
                        </TableCell>
                        <TableCell align="left" width="15%">
                            Volume
                        </TableCell>
                        <TableCell align="left" width="30%">
                            Brand Name
                        </TableCell>
                        <TableCell align="left" width="10%">
                            Price
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicines.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {getIcon(row.category)}
                            </TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.strength}</TableCell>
                            <TableCell align="left">{row.company}</TableCell>
                            <TableCell align="left">{row.price} BDT</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

AlternativeMedicineTable.propTypes = {
    medicines: [
        {
            id: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            medicineName: PropTypes.string.isRequired,
            volume: PropTypes.string.isRequired,
            brandName: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        },
    ],
};

export default AlternativeMedicineTable;

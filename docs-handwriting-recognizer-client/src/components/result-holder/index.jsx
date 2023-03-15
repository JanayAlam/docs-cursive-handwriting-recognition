import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import AlternativeMedicineTable from '../alt-medicine-table';
import styles from './result-holder.module.css';

const ResultHolder = ({ item }) => {
    const medicine = item.medicine;
    return (
        <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
                <Box sx={{ marginTop: 1 }}>
                    <Typography variant="span" color="primary">
                        ID: {item.id}
                    </Typography>
                </Box>
                <Box sx={{ marginTop: 1 }}>
                    <img src={item.photo} width={550} />
                </Box>
                <Typography variant="h5">
                    {item.label}
                    <IconButton
                        aria-label="Copy to clipboard"
                        size="small"
                        sx={{ marginLeft: 1 }}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </Typography>

                <Box sx={{ marginTop: 1 }}>
                    <Typography variant="p">{medicine.company}</Typography>
                    <br />
                    <Typography variant="p" mr={2}>
                        {medicine.generic}
                    </Typography>
                    |
                    <Typography variant="p" mx={2}>
                        Price{' '}
                        <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                            {medicine.price}
                        </Typography>{' '}
                        BDT
                    </Typography>
                </Box>
            </div>
            {item.alternative_brands.length >= 0 ? (
                <div>
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                        Alternative Brand's Medicines
                    </Typography>
                    <Divider />
                    <AlternativeMedicineTable
                        medicines={item.alternative_brands}
                    />
                </div>
            ) : (
                <p>There is no suggestion available</p>
            )}

            {/* <Divider sx={{ marginTop: 2, marginBottom: 2 }} /> */}
        </div>
    );
};

export default ResultHolder;

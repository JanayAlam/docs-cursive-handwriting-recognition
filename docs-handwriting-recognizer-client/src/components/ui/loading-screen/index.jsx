import {
    Box, Divider,
    LinearProgress,
    Skeleton,
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';

const LoadingScreen = ({ numOfLoop }) => {
    numOfLoop = numOfLoop ? numOfLoop : 1;

    return (
        <div sx={{ marginTop: 2 }}>
            <Box sx={{ width: '100%', marginBottom: 2 }}>
                <LinearProgress />
            </Box>
            {[...Array(numOfLoop)].map((_e, i) => (
                <div style={{ marginBottom: '1rem' }} key={i}>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton
                            variant="rectangular"
                            width={256}
                            height={72}
                        />
                    </Box>
                    <Typography variant="h1">
                        <Skeleton width={350} height={50} />
                    </Typography>
                    <Typography variant="p">
                        <Skeleton sx={{ width: '100%' }} height={30} />
                        <Skeleton sx={{ width: '100%' }} height={30} />
                        <Skeleton sx={{ width: '100%' }} height={30} />
                    </Typography>
                    <Typography variant="h6">
                        <Skeleton width={256} height={50} />
                    </Typography>
                    <Typography variant="p">
                        <Skeleton sx={{ width: '100%' }} height={30} />
                        <Skeleton sx={{ width: '100%' }} height={30} />
                        <Skeleton sx={{ width: '100%' }} height={30} />
                    </Typography>
                    <Divider />
                </div>
            ))}
        </div>
    );
};

LoadingScreen.propTypes = {
    numOfLoop: PropTypes.number,
};

export default LoadingScreen;

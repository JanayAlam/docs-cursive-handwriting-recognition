import { Box, Modal } from '@mui/material';
import PropTypes from 'prop-types';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#444',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
};

const ModalComponent = ({
    open,
    handleModalClose,
    id,
    describeBy,
    children,
}) => {
    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby={id ? id : 'modal-modal-title'}
            aria-describedby={
                describeBy ? describeBy : 'modal-modal-description'
            }
        >
            <Box style={style}>{children}</Box>
        </Modal>
    );
};

ModalComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    handleModalClose: PropTypes.func.isRequired,
    id: PropTypes.string,
    describeBy: PropTypes.string,
};

export default ModalComponent;

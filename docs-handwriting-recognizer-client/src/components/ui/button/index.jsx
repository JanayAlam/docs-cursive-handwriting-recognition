import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './button.module.css';

const ButtonComponent = ({
    category,
    variant,
    onClickHandler,
    children,
    size,
    styles: customStyles,
}) => {
    if (!category) category = 'primary';
    if (!variant) variant = 'text';
    if (!size) size = 'medium';

    return (
        <Button
            onClick={onClickHandler}
            color={category}
            variant={variant}
            size={size}
            className={styles.button}
            sx={{
                ...customStyles,
            }}
        >
            {children}
        </Button>
    );
};

ButtonComponent.propTypes = {
    category: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    styles: PropTypes.object,
    onClickHandler: PropTypes.func.isRequired
};

export default ButtonComponent;

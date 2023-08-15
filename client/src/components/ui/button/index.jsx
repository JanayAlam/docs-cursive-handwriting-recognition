import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './button.module.css';

const ButtonComponent = ({
    category,
    variant,
    onClickHandler,
    children,
    size,
    disabled,
    styles: customStyles,
}) => {
    if (!category) category = 'primary';
    if (!variant) variant = 'text';
    if (!size) size = 'medium';
    if (!disabled) disabled = false;

    return (
        <Button
            onClick={onClickHandler}
            color={category}
            variant={variant}
            size={size}
            disabled={disabled}
            sx={{
                ...customStyles,
            }}
            className={styles.button}
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
    disabled: PropTypes.bool,
    onClickHandler: PropTypes.func.isRequired,
};

export default ButtonComponent;

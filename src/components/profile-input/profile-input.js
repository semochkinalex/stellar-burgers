import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileInput = ({name = '', value = '', error = '', type = 'text', placeholder = '', size = 'default', onChange}) => {

    const [isDisabled, setIsDisabled] = useState(true);

    const inputRef = useRef(null);

    const onIconClick = () => {
        setIsDisabled(false);
        setTimeout(() => inputRef.current.focus(), 0);
    }

    const onBlur = () => {
        setIsDisabled(true);
    }

    return (
        <Input 
            ref={inputRef}

            name={name}
            type={type}
            value={value}
            error={Boolean(error)}
            errorText={error}
            placeholder={placeholder}

            onBlur={onBlur}
            onChange={onChange}
            onIconClick={onIconClick}
            disabled={isDisabled}

            icon={'EditIcon'}
            size={size}
        />
    );
}

ProfileInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    error: PropTypes.string,
    size: PropTypes.string,
}

export default ProfileInput;
import { useRef, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const UserProfileInput = ({name, value, error, type, placeholder, onChange}) => {

    const [isDisabled, setIsDisabled] = useState(true);

    const input = useRef(null);

    const handleIconClick = () => {
        setIsDisabled(false);
        setTimeout(() => input.current.focus(), 0);
    }

    const handleBlur = () => {
        setIsDisabled(true);
    }

    return (
        <Input 
            name={name}
            ref={input}
            type={type}
            value={value}
            errorText={error}
            icon={"EditIcon"}
            onBlur={handleBlur}
            onChange={onChange}
            disabled={isDisabled}
            error={Boolean(error)}
            placeholder={placeholder}
            onIconClick={handleIconClick}
        />
    );
}

export default UserProfileInput;
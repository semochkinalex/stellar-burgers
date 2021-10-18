import React, { useRef, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

interface IProfileInput {
    name: string;
    value: string;
    error: string;
    type: 'text' | 'password' | 'email';
    placeholder: string;
    onChange: React.FormEvent<HTMLInputElement> | any;
    size?: 'default' | 'small' | undefined;
}

const ProfileInput: React.FC<IProfileInput> = ({name = '', value = '', error = '', type = 'text', placeholder = '', size = 'default', onChange}) => {

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        setIsDisabled(false);
        // @ts-ignore: doesn't understand
        setTimeout(() => inputRef && inputRef.current.focus(), 0);
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

export default ProfileInput;
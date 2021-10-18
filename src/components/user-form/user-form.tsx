import React from 'react';
import styles from './user-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

interface IUserForm {
    title: string;
    isValid?: boolean;
    submitText: string;
    onSubmit: React.FormEventHandler;
}

const UserForm: React.FC<IUserForm> = ({title, submitText, children, onSubmit}) => {
    return (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
            <h2 className="text text_type_main-medium">
              {title}
            </h2>
            {children}
            <Button type="primary" size="medium">
                {submitText}
            </Button>
            <div className="m-2"></div>
        </form>
    );
}

export default UserForm;
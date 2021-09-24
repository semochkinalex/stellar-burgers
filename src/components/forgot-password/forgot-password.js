import api from '../../utils/api';
import {Link, useHistory} from 'react-router-dom';
import UserForm from '../user-form/user-form';
import styles from './forgot-password.module.css';
import useFormWithValidation from '../../utils/use-form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';

const ForgotPassword = () => {
    const history = useHistory();
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    const handleSubmit = useCallback((evt) => {
        evt.preventDefault();
        
        api.forgotPassword(values.email)
        .then(({success}) => {
            if (success) history.push("/reset-password");
        })
        .catch((message) => console.log(message));
    }, [values])

    return (
        <section className={styles.container} onSubmit={handleSubmit}>
            <UserForm title="Восстановление пароля" submitText="Восстановить" isValid={isValid}>
                <Input onChange={handleChange} value={values.email || ''} error={Boolean(errors.email)} errorText={errors.email} name={'email'} type="email" placeholder={"Укажите e-mail"} required />
            </UserForm>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Вспомнили пароль? <Link className={`text text_type_main-default ${styles.link}`} to="/login">Войти</Link>
            </p>
        </section>
    );
}

export default ForgotPassword;
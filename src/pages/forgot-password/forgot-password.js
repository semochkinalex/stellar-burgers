import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import styles from './forgot-password.module.css';
import useFormWithValidation from '../../utils/use-form';
import UserForm from '../../components/user-form/user-form';
import { forgotPassword } from '../../services/actions/user';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    const handleSubmit = useCallback((evt) => {
        evt.preventDefault();
        dispatch(forgotPassword({email: values.email}, () => history.push("/reset-password")));
    }, [values, dispatch, history])

    return (
        <section className={styles.container}>
            <UserForm title="Восстановление пароля" submitText="Восстановить" isValid={isValid} onSubmit={handleSubmit}>
                <Input onChange={handleChange} value={values.email || ''} error={Boolean(errors.email)} errorText={errors.email} name={'email'} type="email" placeholder={"Укажите e-mail"} required />
            </UserForm>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Вспомнили пароль? <Link className={`text text_type_main-default ${styles.link}`} to="/login">Войти</Link>
            </p>
        </section>
    );
}

export default ForgotPassword;
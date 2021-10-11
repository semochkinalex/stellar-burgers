import {Link, useHistory} from 'react-router-dom';
import UserForm from '../../components/user-form/user-form';
import styles from './reset-password.module.css';
import useFormWithValidation from '../../utils/use-form';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/actions/user';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    const handleSubmit = useCallback((evt) => {
        evt.preventDefault();
        dispatch(resetPassword({password: values.password, code: values.code}, () => history.push("/login")));
    }, [values, dispatch, history])

    return (
        <section className={styles.container}>
            <UserForm title="Восстановление пароля" submitText="Сохранить" isValid={isValid} onSubmit={handleSubmit}>
                <PasswordInput onChange={handleChange} value={values.password || ''} name={'password'} /> {/* Нельзя менять placeholder, а делать свой passwordinput не хочется */}
                <Input onChange={handleChange} value={values.code || ''} error={Boolean(errors.code)} errorText={errors.code} name={'code'} type="text" placeholder={"Введите код из письма"} required />
            </UserForm>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Вспомнили пароль? <Link className={`text text_type_main-default ${styles.link}`} to="/login">Войти</Link>
            </p>
        </section>
    );
}

export default ResetPassword;
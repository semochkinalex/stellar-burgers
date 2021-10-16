import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sign-up.module.css';
import { useHistory } from 'react-router-dom';
import {useDispatch} from '../../services/hooks';
import { signUp } from '../../services/actions/user';
import useFormWithValidation from '../../utils/use-form';
import UserForm from '../../components/user-form/user-form';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { IHistoryState } from '../../services/types/data';

interface ISignUp {};

const SignUp: React.FC<ISignUp> = () => {
    const history: IHistoryState = useHistory();
    const dispatch = useDispatch();
    const {values, errors, isValid, handleChange} = useFormWithValidation({
        name: '',
        email: '',
        password: '',
    });

    const registerUser = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(signUp({name: values.name, email: values.email, password: values.password}, () => {
            const previousPage = history.location.state ? history.location.state.from.pathname : "/";
            return history.replace({pathname: previousPage});
        }))
    }

    return (
        <section className={styles.container}>

            <UserForm title="Регистрация" submitText="Зарегистрироваться" isValid={isValid} onSubmit={registerUser}>
                <Input onChange={handleChange} value={values.name || ''} error={Boolean(errors.name)} errorText={errors.name} name={'name'} type="text" placeholder={"Имя"} />
                <Input onChange={handleChange} value={values.email || ''} error={Boolean(errors.email)} errorText={errors.email} name={'email'} type="email" placeholder={"E-mail"} />
                <PasswordInput onChange={handleChange} value={values.password || ''} name={'password'} /> {/* Тут уже всё продумано */}
            </UserForm>

            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
              Уже зарегистрированы? <Link className={`text text_type_main-default ${styles.link}`} to="/login">Войти</Link>
            </p>

        </section>
    );
}

export default SignUp;
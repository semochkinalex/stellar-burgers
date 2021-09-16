import api from '../../utils/api';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './sign-up.module.css';
import UserForm from '../user-form/user-form';
import { setCookie } from '../../utils/cookie';
import useFormWithValidation from '../../utils/use-form';
import { login, UPDATE_ACCESS_TOKEN, UPDATE_USER_INFO } from '../../services/actions/user';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const SignUp = () => {
    const dispatch = useDispatch();
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    const registerUser = (evt) => {
        evt.preventDefault();
        api.createNewUser({
            name: values.name,
            email: values.email,
            password: values.password,
        })
        .then((data) => {
            if (data.success) {
                const {user : {name, email}, accessToken, refreshToken} = data;
                dispatch(login(name, email, accessToken, refreshToken));
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <section className={styles.container}>

            <UserForm title="Регистрация" submitText="Зарегистрироваться" isValid={isValid} onSubmit={registerUser}>
                <Input onChange={handleChange} value={values.name || ''} error={Boolean(errors.name)} errorText={errors.name} name={'name'} type="text" placeholder={"Имя"} />
                <Input onChange={handleChange} value={values.email || ''} error={Boolean(errors.email)} errorText={errors.email} name={'email'} type="email" placeholder={"E-mail"} />
                <PasswordInput onChange={handleChange} value={values.password || ''} name={'password'} error={Boolean(errors.password)} errorText={errors.password} />
            </UserForm>

            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
              Уже зарегистрированы? <Link className={`text text_type_main-default ${styles.link}`} to="/login">Войти</Link>
            </p>

        </section>
    );
}

export default SignUp;
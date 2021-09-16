import api from '../../utils/api';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './sign-in.module.css';
import UserForm from '../user-form/user-form';
import { login } from '../../services/actions/user';
import useFormWithValidation from '../../utils/use-form';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const SignIn = () => {
    const dispatch = useDispatch();
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    const loginUser = (evt) => {
        evt.preventDefault();
        api.loginUser({
            email: values.email,
            password: values.password,
        })
        .then((data) => {
            if (data.success) {
                const {user : {name, email}, accessToken, refreshToken} = data;
                dispatch(login(name, email, accessToken, refreshToken));
            }
            throw new Error("Error in response: ", data.message)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <section className={styles.container}>

            <UserForm submitText="Войти" title="Вход" isValid={isValid} onSubmit={loginUser}>
                <Input onChange={handleChange} value={values.email || ''} error={Boolean(errors.email)} errorText={errors.email} name={'email'} type="email" placeholder={"E-mail"} required />
                <PasswordInput onChange={handleChange} value={values.password || ''} name={'password'} /> {/* Уже обрабатывает ошибки */}
            </UserForm>

            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Вы — новый пользователь? <Link className={`text text_type_main-default ${styles.link}`} to="/register">Зарегистрироваться</Link>
            </p>
            <div className="m-2"></div>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Забыли пароль? <Link className={`text text_type_main-default ${styles.link}`} to="/reset-password">Восстановить пароль</Link>
            </p>

        </section>
    );
}

export default SignIn;
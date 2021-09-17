import api from '../../utils/api';
import { useCallback } from 'react';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './sign-in.module.css';
import UserForm from '../user-form/user-form';
import { useHistory } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';
import useFormWithValidation from '../../utils/use-form';
import { updateAccessToken, updateUserInfo } from '../../services/actions/user';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const SignIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    const loginUser = useCallback((evt) => {
        evt.preventDefault();
        api.attemptLogin({email: values.email, password: values.password})
        .then(({success, message, user : {name, email}, accessToken, refreshToken}) => {
            if (success) {
                setCookie("token", refreshToken);
                dispatch(updateUserInfo(name, email));
                dispatch(updateAccessToken(accessToken));
                const previousPage = history.location.state ? history.location.state.from.pathname : "/constructor";
                return history.replace({pathname: previousPage});
            }
            throw new Error("Error in attemt to login.", message);
        })
        .catch((message) => console.log(message));
    }, [history, dispatch, api, values]);

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
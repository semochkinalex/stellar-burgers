import api from '../../utils/api';
import { useCallback, useMemo } from 'react';
import {useDispatch} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from './sign-in.module.css';
import UserForm from '../../components/user-form/user-form';
import { useHistory } from 'react-router-dom';
import useFormWithValidation from '../../utils/use-form';
import { signIn } from '../../services/actions/user';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const SignIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const isAuthorized = useSelector(state => Boolean(state.user.token));
    
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    const previousPage = useMemo(() => history.location.state ? history.location.state.from.pathname : "/", [history]);

    const loginUser = useCallback((evt) => {
        evt.preventDefault();
        dispatch(signIn({email: values.email, password: values.password}, () => {
            return history.replace({pathname: previousPage});   
        }));
    }, [history, dispatch, api, values]);

    return (
        isAuthorized ? <Redirect to={{pathname: previousPage}} /> :
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
                Забыли пароль? <Link className={`text text_type_main-default ${styles.link}`} to="/forgot-password">Восстановить пароль</Link>
            </p>

        </section>
    );
}

export default SignIn;
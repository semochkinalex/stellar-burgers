import styles from './sign-in.module.css';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { signIn } from '../../services/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import useFormWithValidation from '../../utils/use-form';
import UserForm from '../../components/user-form/user-form';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

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
    }, [history, dispatch, values, previousPage]);

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
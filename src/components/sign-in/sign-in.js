import UserForm from '../user-form/user-form';
import styles from '../../utils/user-form-styles.module.css';
import FormContainer from '../form-container/form-container';
import useFormWithValidation from '../../utils/use-form';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const SignIn = () => {
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    return (
        <FormContainer>
            <UserForm submitText="Войти" title="Вход" isValid={isValid}>
                <Input onChange={handleChange} value={values.email || ''} error={Boolean(errors.email)} errorText={errors.email} name={'email'} type="email" placeholder={"E-mail"} required />
                <PasswordInput onChange={handleChange} value={values.password || ''} name={'password'} /> {/* Уже обрабатывает ошибки */}
            </UserForm>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Вы — новый пользователь? <a className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</a>
            </p>
            <div className="m-2"></div>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Забыли пароль? <a className={`text text_type_main-default ${styles.link}`}>Восстановить пароль</a>
            </p>
        </FormContainer>
    );
}

export default SignIn;
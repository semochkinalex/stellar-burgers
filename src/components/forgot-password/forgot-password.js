import UserForm from '../user-form/user-form';
import styles from '../../utils/user-form-styles.module.css';
import FormContainer from '../form-container/form-container';
import useFormWithValidation from '../../utils/use-form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPassword = () => {
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    return (
        <FormContainer>
            <UserForm title="Восстановление пароля" submitText="Восстановить" isValid={isValid}>
                <Input onChange={handleChange} value={values.email || ''} error={Boolean(errors.email)} errorText={errors.email} name={'email'} type="email" placeholder={"Укажите e-mail"} required />
            </UserForm>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Вспомнили пароль? <a className={`text text_type_main-default ${styles.link}`}>Войти</a>
            </p>
        </FormContainer>
    );
}

export default ForgotPassword;
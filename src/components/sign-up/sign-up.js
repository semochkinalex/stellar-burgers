import UserForm from '../user-form/user-form';
import FormContainer from '../form-container/form-container';
import styles from '../../utils/user-form-styles.module.css';
import useFormWithValidation from '../../utils/use-form';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const SignUp = () => {

    const [values, errors, isValid, handleChange] = useFormWithValidation();

    return (
        <FormContainer>
            <UserForm title="Регистрация" submitText="Зарегистрироваться" isValid={isValid}>
                <Input onChange={handleChange} value={values.name || ''} error={Boolean(errors.name)} errorText={errors.name} name={'name'} type="text" placeholder={"Имя"} />
                <Input onChange={handleChange} value={values.email || ''} error={Boolean(errors.email)} errorText={errors.email} name={'email'} type="email" placeholder={"E-mail"} />
                <PasswordInput onChange={handleChange} value={values.password || ''} name={'password'} error={Boolean(errors.password)} errorText={errors.password} />
            </UserForm>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
              Уже зарегистрированы? <a className={`text text_type_main-default ${styles.link}`}>Войти</a>
            </p>
        </FormContainer>
    );
}

export default SignUp;
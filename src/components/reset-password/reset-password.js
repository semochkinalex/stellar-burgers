import UserForm from '../user-form/user-form';
import styles from '../../utils/user-form-styles.module.css';
import FormContainer from '../form-container/form-container';
import useFormWithValidation from '../../utils/use-form';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

const ResetPassword = () => {
    const [values, errors, isValid, handleChange] = useFormWithValidation();

    return (
        <FormContainer>
            <UserForm title="Восстановление пароля" submitText="Сохранить" isValid={isValid}>
                <PasswordInput onChange={handleChange} value={values.password || ''} name={'password'} /> {/* Нельзя менять placeholder, а делать свой passwordinput не хочется */}
                <Input onChange={handleChange} value={values.code || ''} error={Boolean(errors.code)} errorText={errors.code} name={'code'} type="text" placeholder={"Введите код из письма"} required />
            </UserForm>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Вспомнили пароль? <a className={`text text_type_main-default ${styles.link}`}>Войти</a>
            </p>
        </FormContainer>
    );
}

export default ResetPassword;
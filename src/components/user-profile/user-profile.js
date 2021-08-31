import styles from './user-profile.module.css';
import useFormWithValidation from '../../utils/use-form';
import UserProfileInput from '../user-profile-input/user-profile-input';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
// import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

const UserProfile = () => {

    const [values, errors, isValid, handleChange] = useFormWithValidation();

    return (
        <section className={styles.profile}>
            <nav className={styles.navigation}>
                    <a className="text text_type_main-medium">
                        Профиль
                    </a>
                    <a className="text text_type_main-medium">
                        История заказов
                    </a>
                    <a className="text text_type_main-medium">
                        Выход
                    </a>
                    <p className={`text text_type_main-small text_color_inactive ${styles.hint}`}>
                        В этом разделе вы можете
                        изменить свои персональные данные
                    </p>
            </nav>
            <form className={styles.form}>
                <UserProfileInput 
                    name={"name"}
                    type={"text"}
                    error={errors.name}
                    value={values.name}
                    placeholder={"Имя"}
                    onChange={handleChange}
                />
                <UserProfileInput 
                    name={"email"}
                    type={"email"}
                    error={errors.email}
                    value={values.email}
                    placeholder={"Логин"}
                    onChange={handleChange}
                />
                <UserProfileInput 
                    name={"password"}
                    type={"password"}
                    error={errors.password}
                    value={values.password}
                    placeholder={"Пароль"}
                    onChange={handleChange}
                /> {/* Можно будет вставить RegExp */}
            </form>
            <></> {/* Сделано чтобы расположить по центру меню с формами. Ломается если удалить */}
        </section>
    );
}

export default UserProfile;
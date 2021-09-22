import styles from './user-profile.module.css';
import useFormWithValidation from '../../utils/use-form';
import UserProfileInput from '../user-profile-input/user-profile-input';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { changeUserInfo } from '../../services/actions/user';

const UserProfile = () => {
    const dispatch = useDispatch();
    const {name, email, token} = useSelector(store => {
        return {
            name: store.user.name,
            email: store.user.email,
            token: store.user.token,
        }
    });

    const [values, errors, isValid, handleChange] = useFormWithValidation({name: name, email: email});

    const handleSubmit = useCallback((evt) => {
        evt.preventDefault();
        dispatch(changeUserInfo(values.name, values.email, token));
    }, [values]);

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
            <form className={styles.form} onSubmit={handleSubmit}>
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
                <div className={styles.confirmation, (values.name == name && values.email == email ? styles.none : '')}>
                    <Button type="secondary" size="medium">
                        Отмена
                    </Button>
                    <button type="submit" className={styles.submit}>
                        <Button type="primary" size="large">
                            Сохранить
                        </Button>
                    </button>
                </div>
            </form>
            <></> {/* Сделано чтобы расположить по центру меню с формами. Ломается если удалить */}
        </section>
    );
}

export default UserProfile;
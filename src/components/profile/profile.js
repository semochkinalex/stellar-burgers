import styles from './profile.module.css';
import ProfileEdit from '../profile-edit/profile-edit';
import useFormWithValidation from '../../utils/use-form';
import ProfileInput from '../profile-input/profile-input';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
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

    const [values, errors, isValid, handleChange, changeValues] = useFormWithValidation();

    const handleSubmit = useCallback((evt) => {
        evt.preventDefault();
        dispatch(changeUserInfo(values.name, values.email, values.password, token));
    }, [values]);

    const resetValues = useCallback(() => {
        name && email && changeValues({name, email});
    }, [values, name, email]);

    useEffect(() => {
        name && email && changeValues({name, email}); // Should be valid values
    }, [name, email])

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
            <ProfileEdit />
            <></> {/* Сделано чтобы расположить по центру меню с формами. Ломается если удалить */}
        </section>
    );
}

export default UserProfile;
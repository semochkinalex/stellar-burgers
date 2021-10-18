import styles from './profile-edit.module.css';
import useFormWithValidation from '../../utils/use-form';
import ProfileInput from '../profile-input/profile-input';
import { useCallback, useEffect } from 'react';
import { changeUserInfo } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../services/hooks';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileEdit = () => {
    const dispatch = useDispatch();

    const {name, email, token} = useSelector(store => {
        return {
            name: store.user.name,
            email: store.user.email,
            token: store.user.token,
        }
    });

    const {values, errors, isValid, handleChange, changeValues} = useFormWithValidation({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = useCallback((evt) => {
        evt.preventDefault();
        dispatch(changeUserInfo(values.name, values.email, values.password, token));
    }, [values]);

    const resetValues = useCallback(() => {
        name && email && changeValues({name, email, password: values.password});
    }, [values, name, email]);

    useEffect(() => {
        name && email && changeValues({name, email, password: values.password}); // Should be valid values
    }, [name, email])

    return (
            <form className={styles.form} onSubmit={handleSubmit}>
                <ProfileInput 
                    name={"name"}
                    type={"text"}
                    error={errors.name}
                    value={values.name || ''}
                    placeholder={"Имя"}
                    onChange={handleChange}
                />
                <ProfileInput
                    name={"email"}
                    type={"email"}
                    error={errors.email}
                    value={values.email || ''}
                    placeholder={"Логин"}
                    onChange={handleChange}
                />
                <ProfileInput
                    name={"password"}
                    type={"password"}
                    error={errors.password}
                    value={values.password || ''}
                    placeholder={"Пароль"}
                    onChange={handleChange}
                /> 
                <div className={styles.confirmation + ((values.name === name && values.email === email && !values.password) || !isValid ? styles.none : '')}>
                    <Button type="secondary" size="medium" onClick={resetValues}>
                        Отмена
                    </Button>
                    <Button type="primary" size="large" onClick={handleSubmit}> {/* В иделае можно было бы через onSubmit, но тут пресетная кнопка */}
                        Сохранить
                    </Button>
                </div>
            </form>
    );
}

export default ProfileEdit;
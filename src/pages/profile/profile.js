import styles from './profile.module.css';
import { useCallback, useEffect } from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';
import ProfileEdit from '../../components/profile-edit/profile-edit';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrderHistory, logout } from '../../services/actions/user';
import OrderList from '../../components/orders-list/orders-list';

const UserProfile = () => {
    const dispatch = useDispatch();
    const token = useSelector(store => store.user.token);
    const orders = useSelector(store => store.user.orders);

    const handleLogout = useCallback(() => {
        dispatch(logout(token));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUsersOrderHistory(token));
    }, [])

    return (
        <section className={styles.profile}>
            <nav className={styles.navigation}>
                    <NavLink className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeClassName={styles.active} to="/profile/edit">
                        Профиль
                    </NavLink>
                    <NavLink className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeClassName={styles.active} to="/profile/orders">
                        История заказов
                    </NavLink>
                    <button className={`text text_type_main-medium text_color_inactive ${styles.link}`} onClick={handleLogout}>
                        Выход
                    </button>
                    <p className={`text text_type_main-small text_color_inactive ${styles.hint}`}>
                        В этом разделе вы можете
                        изменить свои персональные данные
                    </p>
            </nav>
            <Switch>
                <Route path="/profile/edit" exact={true}>
                    <ProfileEdit />
                </Route>
                <Route path="/profile/orders">
                    <OrderList orders={orders} custom={{marginTop: "-70px"}} />
                </Route>
            </Switch>
            <></> {/* Сделано чтобы расположить по центру меню с формами. Ломается если удалить */}
        </section>
    );
}

export default UserProfile;
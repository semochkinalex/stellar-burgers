import React from 'react';
import { useCallback } from 'react';
import styles from './profile.module.css';
import { logout } from '../../services/actions/user';
import { Switch, NavLink, Route } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import OrderList from '../../components/orders-list/orders-list';
import ProfileEdit from '../../components/profile-edit/profile-edit';

interface IUserProfile {};

const UserProfile: React.FC<IUserProfile> = () => {
    const dispatch = useDispatch();
    const token = useSelector(store => store.user.token);
    const orders = useSelector(store => store.user.orderHistory);

    const handleLogout = useCallback(() => {
        dispatch(logout(token));
    }, [dispatch]);

    return (
        <section className={styles.profile}>
            <nav className={styles.navigation}>
                    <NavLink className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeStyle={{color: "white"}} to="/profile/edit">
                        Профиль
                    </NavLink>
                    <NavLink className={`text text_type_main-medium text_color_inactive ${styles.link}`} activeStyle={{color: "white"}} to="/profile/orders">
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
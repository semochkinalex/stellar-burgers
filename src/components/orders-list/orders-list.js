import { useEffect } from 'react';
import styles from './orders-list.module.css';
import OrderInfo from '../order-info/order-info';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialOrders } from '../../services/actions/order';
import { WS_CONNECTION_START } from '../../services/actions/socket';


const url = 'wss://norma.nomoreparties.space/orders/all';

const OrderList = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector(store => store.order);
    const {loggedIn} = useSelector(store => {
        return {
            loggedIn: Boolean(store.user.token)
        }
    });

    useEffect(() => {
        if (!loggedIn) return dispatch(getInitialOrders()); // is user isn't logged in we get data from https
        dispatch({type: WS_CONNECTION_START, payload: url}); // if he is we get data from wss
    }, [OrderList]);

    return (
        <ul className={styles.container}>
            {
                orders.map((order) => {
                    return <OrderInfo order={order} key={order._id} />
                })
            }
        </ul>
    )
}

export default OrderList;
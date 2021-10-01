import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './feed.module.css';
import { getInitialOrders } from '../../services/actions/order';
import OrderList from '../../components/orders-list/orders-list';
import { WS_CONNECTION_START } from '../../services/actions/socket';

const url = 'wss://norma.nomoreparties.space/orders/all';

const Feed = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector(store => store.order);

    useEffect(() => {
        if (!orders.length) dispatch(getInitialOrders());
        dispatch({type: WS_CONNECTION_START, payload: url});
    }, [Feed]);

    return (
        <section className={styles.container}>
            <p className="text text_type_main-medium">
                Лента заказов
            </p>
            <OrderList orders={orders} />
        </section>
    );
}

export default Feed;
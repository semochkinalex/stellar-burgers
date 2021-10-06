import styles from './feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import OrderList from '../../components/orders-list/orders-list';
import Statistics from '../../components/statistics/statistics';
import { useEffect } from 'react';
import { addSocketConnection, removeSocketConnection } from '../../services/actions/socket';

const url = 'wss://norma.nomoreparties.space/orders/all';

const Feed = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector(store => store.orders);
    
    useEffect(() => {
        dispatch(addSocketConnection(url));
        return () => {removeSocketConnection()};
    }, [])

    return (
        <section className={styles.container}>
            <div className={styles.orders}>
                <p className="text text_type_main-medium">
                    Лента заказов
                </p>
                <OrderList orders={orders} />
            </div>
            <Statistics />
        </section>
    );
}

export default Feed;
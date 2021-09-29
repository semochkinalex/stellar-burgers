import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './feed.module.css';
import { getInitialOrders } from '../../services/actions/order';
import OrderList from '../../components/orders-list/orders-list';

const url = 'wss://norma.nomoreparties.space/api/orders';

const Feed = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector(store => store.order);

    useEffect(() => {
        dispatch(getInitialOrders());
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
import { useEffect } from 'react';
import styles from './feed.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import OrderList from '../../components/orders-list/orders-list';
import Statistics from '../../components/statistics/statistics';
import { addSocketConnection, removeSocketConnection } from '../../services/actions/socket';

const url: string = 'wss://norma.nomoreparties.space/orders/all';

const Feed = () => {
    const dispatch = useDispatch();

    const { feed } = useSelector(store => store.feed);
    
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
            <OrderList orders={feed} />
        </div>
            <Statistics />
        </section>
    );
}

export default Feed;
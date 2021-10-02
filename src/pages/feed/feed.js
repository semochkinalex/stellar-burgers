import styles from './feed.module.css';
import { useSelector } from 'react-redux';
import OrderList from '../../components/orders-list/orders-list';
import Statistics from '../../components/statistics/statistics';

const Feed = () => {
    const {orders} = useSelector(store => store.orders);
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
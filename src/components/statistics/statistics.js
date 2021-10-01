import { useSelector } from 'react-redux';
import DigitDisplay from '../digit-display/digit-display';
import OrdersCollection from '../orders-collection/orders-collection';
import styles from './statistics.module.css';

const resizeArray = (array, lenght) => {
    const ans = [];
    for (let i = 0; i < lenght; ++i) {
        array[i] && ans.push(array[i]);
    }
    return ans;
}

const Statistics = () => {

    const {doneOrders, pendingOrders} = useSelector(store => {
        return {
            doneOrders: resizeArray(store.orders.orders.filter((order) => order.status === "done").map((order) => order.number), 10),
            pendingOrders: resizeArray(store.orders.orders.filter((order) => order.status !== "done").map((order) => order.number), 10),
        }
    })

    const {total, totalToday} = useSelector(store => {
        return {
            total: store.orders.total,
            totalToday: store.orders.totalToday,
        }
    })

    return (
        <section className={styles.container}>
            <div className={styles.orders}>
                <OrdersCollection title={"Готовы"} list={doneOrders} extraClassName={styles.green} />
                <OrdersCollection title={"В работе"} list={pendingOrders} />
            </div>
            <DigitDisplay title={"Выполнено за все время:"} number={total || 0} />
            <DigitDisplay title={"Выполнено за сегодня:"} number={totalToday || 0} />
        </section>
    );
}

export default Statistics;
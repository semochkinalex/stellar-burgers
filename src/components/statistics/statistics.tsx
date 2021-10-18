import { useSelector } from '../../services/hooks';
import { TOrder } from '../../services/types/data';
import { DigitDisplay } from '../digit-display/digit-display';
import OrdersCollection from '../orders-collection/orders-collection';
import styles from './statistics.module.css';

const resizeArray = (array: ReadonlyArray<number>, lenght: number) => {
    const ans = [];
    for (let i = 0; i < lenght; ++i) {
        array[i] && ans.push(array[i]);
    }
    return ans;
}

const Statistics = () => {

    const {total, totalToday, doneOrders, pendingOrders} = useSelector(store => {
        return {
            total: store.feed.total,
            totalToday: store.feed.totalToday,
            doneOrders: resizeArray(store.feed.feed.filter((order: TOrder) => order.status === "done").map((order: TOrder) => order.number), 10),
            pendingOrders: resizeArray(store.feed.feed.filter((order: TOrder) => order.status !== "done").map((order: TOrder) => order.number), 10),
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
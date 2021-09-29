import OrderInfo from '../order-info/order-info';
import styles from './orders-list.module.css';

const OrderList = ({orders}) => {
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
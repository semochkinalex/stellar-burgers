import styles from './orders-list.module.css';
import OrderInfo from '../order-info/order-info';

const OrderList = ({orders, custom}) => {
    return (orders || orders?.length ? 
        (<ul className={styles.container} style={custom}>
            {
                orders.map((order) => {
                    return <OrderInfo order={order} key={order._id} />
                })
            }
        </ul>)
        :
        <p className="text text_type_main-large">
            Нет заказов
        </p>
    )
}

export default OrderList;
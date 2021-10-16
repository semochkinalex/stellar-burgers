import React from 'react';
import styles from './orders-list.module.css';
import OrderInfo from '../order-info/order-info';
import { TOrder } from '../../services/types/data';

interface IOrderList {
    orders: ReadonlyArray<TOrder>;
    custom?: React.CSSProperties;
}

const OrderList: React.FC<IOrderList> = ({orders, custom}) => {
    return (orders && orders.length ? 
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
import React from 'react';
import styles from './order-details.module.css';
import { useSelector } from '../../services/hooks';
import orderConfirmedIcon from '../../images/orderConfirmed.svg';

interface IOrderDetails {};

const OrderDetails: React.FC<IOrderDetails> = () => {
    const {number, orderRequestSent} = useSelector(store => {
        return {
            number: store.order.orderData.number,
            orderRequestSent: store.order.orderRequestSent,
            orderRequestFailed: store.order.orderRequestFailed,
        }
    });
    
    return (
        <>  
        {!orderRequestSent ? 
            <>           
                <p className={`text text_type_digits-large ${styles.id}`}>{number || "Тут будет"}</p>
                <p className={`text text_type_main-medium ${styles.identification}`}>
                    идентификатор заказа
                </p>
                <img className={styles.image} src={orderConfirmedIcon} alt="Order Confirmed" />
                <p className={`text text_type_main-default ${styles.text}`}>
                    Ваш заказ начали готовить
                </p>
                <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </>
         : 
         <>
            <p className={styles["id-s"]}>123123</p> {/* 's' stands for skeleton */}
            <p className={styles["identification-s"]}>qwdqwdqwdqwdqwdqwd</p>
            <p className={styles["text-s"]}>qwdqwdqwdqwdqwdqwdqwdqwdqwdqwdqwdqwd</p>
            <p className={styles["text-s"]}>qwdqwdqwdqwdqwdqwd</p>
         </>
        }
    </>
    );
}

export default OrderDetails;
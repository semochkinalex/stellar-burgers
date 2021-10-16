import React from 'react';
import { TOrder } from '../../services/types/data';
import styles from './orders-collection.module.css';

interface IOrdersCollection {
    title: string;
    extraClassName?: string;
    list: ReadonlyArray<TOrder>
}

const OrdersCollection: React.FC<IOrdersCollection> = ({title, extraClassName, list = []}) => {
    if (!list) return null;
    return (
        <div className={styles.container}>
            <p className={`text text_type_main-medium ${styles.title}`}>{title}:</p>
            <ul className={styles.list}>
                { list.length ? 
                (
                    list.map((el, i) => {
                        return <li className={styles.element} key={i}><p className={`text text_type_digits-default ${extraClassName}`}>{el}</p></li>;
                    })
                )
                :
                <p className="text text_type_main-default">Нет заказов</p>
                }
            </ul>
        </div>
    );
}

export default OrdersCollection;
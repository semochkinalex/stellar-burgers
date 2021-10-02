import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-summary.module.css';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { ifError } from 'assert';

const OrderSummary = () => {
    const { id } = useParams();

    const {orders, initialIngredients} = useSelector(store => {
        return {
            orders: store.orders.orders,
            initialIngredients: [...store.ingredients.buns, ...store.ingredients.sauces, ...store.ingredients.mains],
        }
    });

    const selectedOrder = useMemo(() => {
        return orders.find((order) => order._id == id);
    }, [orders, id]);

    const colorClassName = useMemo(() => selectedOrder && selectedOrder.status === 'done' ? styles.green : '',[selectedOrder]);

    const displayedData = useMemo(() => {
        const data = [];
        if (!selectedOrder) return data;
        const ingredients = selectedOrder.ingredients.map((ingredient) => { // no duplicates
            return initialIngredients.find((el) => el._id === ingredient);
        })
        ingredients.forEach((ingredient) => {
            const count = ingredient.type === "bun" ? 2 : ingredients.filter(element => element._id === ingredient._id).length;
            const newData = {...ingredient, count};
            !data.find((element) => element._id === ingredient._id) && data.push(newData);
        })
        return data;
    }, [orders]);


    const price = useMemo(() => displayedData.reduce((acc, val) => acc + (val.price * (val.count || 1)), 0), [displayedData]);

    if (!selectedOrder) return null;
    return (
            <section className={styles.container}>
                <p className={`text text_type_digits-default ${styles.id}`}>#{selectedOrder.number}</p>
                <h2 className={`text text_type_main-medium ${styles.name}`}>{selectedOrder.name}</h2>
                <p className={`text text_type_main-small ${styles.status} ${colorClassName}`}>{selectedOrder.status === 'done' ? 'Выполнен' : 'Готовится'}</p> {/* не понятно какие ещё статусы есть */}
                <p className={`text text_type_main-medium`}>Состав:</p>
                <ul className={styles.list}>
                    {
                        displayedData.map((ingredient) => {
                            return (
                                <li className={styles.item} key={ingredient._id}>
                                    <IngredientIcon ingredient={ingredient} />
                                    <p className={`text text_type_main-default ${styles.ingredient}`}>{ingredient.name}</p>
                                    <div className={styles.check}>
                                        <p className={`text text_type_digits-default`}>{ingredient.count} x {ingredient.price}</p>
                                        <CurrencyIcon />
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={styles.footer}>
                    <p className={`text text_type_main-default text_color_inactive`}>{selectedOrder.createdAt}</p>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default">{price}</p>
                        <CurrencyIcon />
                    </div>
                </div>
            </section>
    );
}

export default OrderSummary;
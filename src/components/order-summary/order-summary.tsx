import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-summary.module.css';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { addSocketConnection } from '../../services/actions/socket';

import { TIngredient, TOrder } from '../../services/types/data';

const wsUrl: string = 'wss://norma.nomoreparties.space/orders/all';

interface IOrderSummary {};

const OrderSummary: React.FC<IOrderSummary> = () => {
    const { id } = useParams<{id?: string}>();
    const { url } = useRouteMatch();

    const dispatch = useDispatch();
    
    const {orders, initialIngredients} = useSelector(store => {
        return {
            orders: url.includes("profile") ? store.user.orderHistory : store.feed.feed,
            initialIngredients: [...store.ingredients.buns, ...store.ingredients.sauces, ...store.ingredients.mains],
        }
    });

    useEffect(() => {
        if (!orders.length) {
            dispatch(addSocketConnection(wsUrl))
        };
    }, [])

    const selectedOrder = useMemo(() => {
        return orders.find((order: TOrder) => order._id == id);
    }, [orders, id]);

    
    const displayedData = useMemo(() => {
        const data: Array<TIngredient> = [];
        if (!selectedOrder) return data;
        const ingredients: any = selectedOrder.ingredients.map((ingredient: string) => { // no duplicates
            return initialIngredients.find((el: TIngredient) => el._id === ingredient);
        });
        ingredients.forEach((ingredient: TIngredient | undefined) => {
            if (!ingredient) return;
            const count = ingredient.type === "bun" ? 2 : ingredients.filter((element: TIngredient) => element._id === ingredient._id).length;
            const newData: TIngredient = {...ingredient, count};
            !data.find((element) => element._id === ingredient._id) && data.push(newData);
        })
        return data;
    }, [orders]);
    
    const colorClassName = useMemo(() => selectedOrder && selectedOrder.status === 'done' ? styles.green : '',[selectedOrder]);

    const price = useMemo(() => displayedData.reduce((acc, val) => acc + (val.price * (val.count || 1)), 0), [displayedData]);

    // if (!selectedOrder) return null;
    return (
            selectedOrder ? 
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
                                        <CurrencyIcon type="primary" />
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
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </section>
            :
            <p className={`text text_type_main-large`}>Заказ не найдён. Возможно он не ваш</p>
    );
}

export default OrderSummary;
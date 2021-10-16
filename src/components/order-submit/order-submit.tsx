import React from 'react';
import styles from './order-submit.module.css';
import { useHistory } from 'react-router-dom';
import { handleOrder } from '../../services/actions/order';
import { useDispatch, useSelector } from '../../services/hooks';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderSubmit {}

const OrderSubmit: React.FC<IOrderSubmit> = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {ingredients, bun, isLoggedIn, token} = useSelector(store => ({
        bun: store.burger.bun,
        ingredients: store.burger.ingredients,
        isLoggedIn: Boolean(store.user.token),
        token: store.user.token,
    }))

    const sum = useSelector(store => store.burger.priceSum);
    const isValid = useSelector(store => store.burger.isValidBurger);

    const handleCheckout = () => {
        isLoggedIn ? dispatch(handleOrder(ingredients, bun, token)) : history.replace({pathname: "/login"});
    }

    return (
        <div className={styles.check}>

            {
            isValid && <>
            <p className="text text_type_main-large">
                {sum}    
            </p>

            <div className="m-1"></div>

            <CurrencyIcon type="primary" />
            
            <div className="m-3"></div>
            <Button type="primary" size="large" onClick={handleCheckout}>
                Оформить заказ
            </Button>
            </>}

        </div>
    );
}

export default OrderSubmit;
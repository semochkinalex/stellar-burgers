import styles from './order-submit.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleOrder } from '../../services/actions/order';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderSubmit = () => {
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

            <p className="text text_type_main-large">
                {sum}    
            </p>

            <div className="m-1"></div>

            <CurrencyIcon type="primary" />
            
            <div className="m-3"></div>

            <Button type="primary" size="large" onClick={handleCheckout} disabled={!isValid}>
                Оформить заказ
            </Button>

        </div>
    );
}

export default OrderSubmit;
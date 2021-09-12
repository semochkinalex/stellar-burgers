import styles from './burger-check.module.css';
import { handleOrder } from '../../services/actions/order';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerCheck = () => {
    const dispatch = useDispatch();
    const {ingredients, bun} = useSelector(store => ({
        bun: store.burger.bun,
        ingredients: store.burger.ingredients,
    }))

    const sum = useSelector(store => store.burger.priceSum);
    const isValid = useSelector(store => store.burger.isValidBurger);

    const handleCheckout = () => {
        dispatch(handleOrder(ingredients, bun));
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

export default BurgerCheck;
import api from '../../utils/api';
import styles from './burger-check.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_ORDER_POPUP, ORDER_REQUEST_PENDING, ORDER_REQUEST_FAIL } from '../../services/actions/popups-info';

const BurgerCheck = () => {
    const dispatch = useDispatch();
    const {ingredients, bun} = useSelector(store => ({
        bun: store.burger.bun,
        ingredients: store.burger.ingredients,
    }))

    const sum = useSelector(store => store.burger.priceSum);
    const isValid = useSelector(store => store.burger.isValidBurger);

    const handleOrder = () => {
        dispatch({type: ORDER_REQUEST_PENDING});
        const data = ingredients.concat([bun, bun]).map((e) => e._id);
        api.handleOrder(data)
        .then((res) => {
            if (res && res.success) {
                const {name, order: {number}} = res;
                return dispatch({
                    type: OPEN_ORDER_POPUP,
                    order: {name, number},
                })
            }
            throw new Error("Произошла ошибка при создании заказа.")
        })
        .catch((err) => {
          console.log(err);
          dispatch({type: ORDER_REQUEST_FAIL});
        })
    }

    return (
        <div className={styles.check}>
            <p className="text text_type_main-large">
                {sum}    
            </p>
            <div className="m-1"></div>
            <CurrencyIcon type="primary" />
            <div className="m-3"></div>
            <Button type="primary" size="large" onClick={handleOrder} disabled={!isValid}>
                Оформить заказ
            </Button>
        </div>
    );
}

export default BurgerCheck;
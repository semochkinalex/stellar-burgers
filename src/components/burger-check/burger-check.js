import PropTypes from 'prop-types';
import styles from './burger-check.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerCheck = ({sum, handleOrder, isValid}) => {
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

BurgerCheck.propTypes = {
    sum: PropTypes.number.isRequired,
    handleOrder: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
}

export default BurgerCheck;
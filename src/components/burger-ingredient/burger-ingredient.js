import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import { FoodPropTypes } from '../../utils/prop-types';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = ({data, mobile}) => {
    const {name, price, image, image_mobile} = data;
    
    return (
        <li className={styles.card}>
            <img className={styles.image} alt={`${name}`} src={mobile ? image_mobile : image} />
            <div className={styles.price}>
                <span className={`text text_type_main-medium ${styles.money}`}>
                    {price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-small ${styles.name}`}>
                {name}
            </p>
        </li>
    );
}

BurgerIngredient.propTypes = {
    data: FoodPropTypes.isRequired,
    mobile: PropTypes.bool.isRequired,
}

export default BurgerIngredient;
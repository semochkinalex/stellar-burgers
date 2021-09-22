import { useCallback } from 'react';
import { useDrag } from "react-dnd";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './burger-ingredient.module.css';
import { IngredientPropTypes } from '../../utils/prop-types';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = ({ingredient}) => {
    const {name, price, type, image, image_mobile, _id} = ingredient;
    const {mobile, count} = useSelector(store => ({
        count: type === "bun" ? store.burger.bun._id === _id && 2 : store.burger.ingredients.filter(ingredient => ingredient._id === _id).length, // mb not the best decision 
        mobile: store.config.isMobileIngredients,
    }));

    const [, dragRef] = useDrag({
        type: type,
        item: {ingredient},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    return (
        <Link className={styles.link} target="_blank" to={`/ingredients/${_id}`}>
            <li className={styles.card} draggable ref={dragRef}> {/* onClick={addIngredient} */}
                <img className={styles.image} alt={`${name}`} src={mobile ? image_mobile : image} draggable={false} />
                <div className={styles.price}>
                    <span className={`text text_type_main-medium ${styles.money}`}>
                        {price}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-small ${styles.name}`}>
                    {name}
                </p>
                {count && <div className={styles.wrapper}><Counter count={count} size="default" /></div>}
            </li>
        </Link>
    );
}

BurgerIngredient.propTypes = {
    ingredient: IngredientPropTypes.isRequired,
}

export default BurgerIngredient;
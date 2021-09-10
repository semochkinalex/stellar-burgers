import { useCallback } from 'react';
import { useDrag } from "react-dnd";
import styles from './burger-ingredient.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { IngredientPropTypes } from '../../utils/prop-types';
import { OPEN_INSPECTED_INGREDIENT } from '../../services/actions/inspected-element';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = ({ingredient}) => {
    const dispatch = useDispatch();

    const {name, price, type, image, image_mobile, _id} = ingredient;
    const {mobile, count} = useSelector(store => ({
        mobile: store.config.isMobileIngredients,
        count : store.burger.ingredients.filter(ingredient => ingredient._id == _id).length, // mb not the best decision
    }));

    const [, dragRef] = useDrag({
        type: type,
        item: {ingredient},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    const handleInspect = useCallback(() => {
        dispatch({
            type: OPEN_INSPECTED_INGREDIENT,
            ingredient: ingredient,
        })
    }, [dispatch]);
    
    return (
        <li className={styles.card} onClick={handleInspect} draggable ref={dragRef}> {/* onClick={addIngredient} */}
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
    );
}

BurgerIngredient.propTypes = {
    ingredient: IngredientPropTypes.isRequired,
}

export default BurgerIngredient;
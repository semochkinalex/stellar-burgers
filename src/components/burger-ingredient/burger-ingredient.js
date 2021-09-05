import { useCallback } from 'react';
import { useDrag } from "react-dnd";
import styles from './burger-ingredient.module.css';
import { OPEN_INSPECTED_INGREDIENT } from '../../services/actions/popups-info';
import { IngredientPropTypes } from '../../utils/prop-types';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';

const BurgerIngredient = ({ingredient}) => {
    const dispatch = useDispatch();

    const {mobile} = useSelector(store => ({
        mobile: store.config.isMobileIngredients,
    }));

    const {_id, name, price, type, image, image_mobile} = ingredient;

    const [{isDragging}, dragRef] = useDrag({
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
        </li>
    );
}

BurgerIngredient.propTypes = {
    ingredient: IngredientPropTypes.isRequired,
}

export default BurgerIngredient;
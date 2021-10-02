import { memo, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './order-info.module.css';
import {useRouteMatch, Link, useLocation} from 'react-router-dom';

const OrderInfo = memo(({order : {name, number, ingredients, createdAt, _id}}) => {
    const location = useLocation();
    const { url } = useRouteMatch();
    
    const { initialIngredients } = useSelector(store => {
        return {
            initialIngredients: [...store.ingredients.buns, ...store.ingredients.sauces, ...store.ingredients.mains],
        }
    })
    const ingredientsData = useMemo(() => {
        return [...new Set(ingredients.map((ingredient) => { // no duplicates
            return initialIngredients.find((el) => el._id === ingredient);
        }))];
    }, [ingredients]);

    return (
        <Link to={{pathname: `${url}/${_id}`, state: { background: location}}} style={{ textDecoration: 'none' }}>
            <li className={styles.order}>
                <p className={`text text_type_digits-default ${styles.id}`}>
                    #{number}
                </p>
                <p className={`text text_type_main-default text_color_inactive ${styles.date}`}>
                    {createdAt}
                </p>
                <h3 className={`text text_type_main-medium ${styles.name}`}>{name}</h3>
                <ul className={styles.ingredients}>
                    {
                        ingredientsData.map((ingredient, i) => {
                            return i < 7 || ingredientsData.length === 8 ?
                            <li className={styles.element} style={{right: `${10*i}px`}} key={i}><IngredientIcon ingredient={ingredient} /></li>
                            :
                            i === 8 ?
                            <li className={styles.element} style={{right: `${10*i}px`}} key={i}><IngredientIcon ingredient={ingredient} last={true} size={ingredientsData.length} /></li>
                            :
                            null;
                        })
                    }
                </ul>
                <span className={`text text_type_digits-medium ${styles.price}`}>{
                    // ingredientsData.reduce((acc, ingredient) => acc + ingredient.price, 0)
                    0
                }</span>
            </li>
        </Link>
    );
})

export default OrderInfo;
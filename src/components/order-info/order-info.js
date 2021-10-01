import { memo, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './order-info.module.css';

const OrderInfo = memo(({order : {status, name, number, ingredients, createdAt}}) => {
    const { initialIngredients } = useSelector(store => {
        return {
            initialIngredients: [...store.ingredients.buns, ...store.ingredients.sauces, ...store.ingredients.mains],
        }
    })
    const ingredientsData = useMemo(() => {
        return ingredients.map((ingredient) => {
            return initialIngredients.find((el) => el._id === ingredient);
        })
    }, [ingredients]);

    return (
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
                        <IngredientIcon ingredient={ingredient} index={i} key={i} />
                        :
                        i === 8 ?
                        <IngredientIcon ingredient={ingredient} index={i} key={i} last={true} size={ingredientsData.length} />
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
    );
})

export default OrderInfo;
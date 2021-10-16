import React from 'react';
import { useSelector } from '../../services/hooks';
import styles from './ingredients-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { TIngredient } from '../../services/types/data';

interface IIngredientsCategory {
    title: string;
}

const IngredientsCategory = React.forwardRef<HTMLDivElement, IIngredientsCategory>(({title}, ref) => {

    const {ingredients} = useSelector((store) => ({
      ingredients: title === "Булки" ? store.ingredients.buns : title === "Соусы" ? store.ingredients.sauces : store.ingredients.mains,
    }));

    return (
        <div className={styles.container} ref={ref}>
            <h3 className={`text text_type_main-medium ${styles.name}`}>
                {title}
            </h3>
            <ul className={styles.list}>
                  {ingredients.map((ingredient: TIngredient) => {
                    return <BurgerIngredient ingredient={ingredient} key={ingredient._id} />
                   })}
            </ul>
        </div>)
})

export default IngredientsCategory;
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-category.module.css';
import { IngredientPropTypes } from '../../utils/prop-types';
import BurgerIngredient from '../burger-ingredient/burger-ingredient.js';
import { useSelector } from 'react-redux';

const IngredientsCategory = React.forwardRef(({title, mobile, inspectIngredient}, ref) => {

    const {ingredients} = useSelector((store) => ({
      ingredients: title === "Булки" ? store.ingredients.buns : title === "Соусы" ? store.ingredients.sauces : store.ingredients.mains,
    }));

    const selectIngredient = (ingredient) => {
      inspectIngredient(ingredient);
    }

    return (
        <div className={styles.container} name="main" ref={ref}>
            <h3 className={`text text_type_main-medium ${styles.name}`}>
                {title}
            </h3>
            <ul className={styles.list}>
                  {ingredients.map((ingredient) => {
                    return <BurgerIngredient ingredient={ingredient} key={ingredient._id} onSelect={selectIngredient} />
                   })}
            </ul>
        </div>)
})

IngredientsCategory.propTypes = {
    title: PropTypes.string.isRequired,
};

export default IngredientsCategory;
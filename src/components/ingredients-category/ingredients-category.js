import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-category.module.css';
import { IngredientPropTypes } from '../../utils/prop-types';
import BurgerIngredient from '../burger-ingredient/burger-ingredient.js';

const IngredientsCategory = React.forwardRef(({ingredients, title, mobile, inspectIngredient}, ref) => {
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
                    return <BurgerIngredient mobile={mobile} ingredient={ingredient} key={ingredient._id} onSelect={selectIngredient} />
                   })}
            </ul>
        </div>)
})

IngredientsCategory.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientPropTypes).isRequired,
    title: PropTypes.string.isRequired,
    mobile: PropTypes.bool.isRequired,
};

export default IngredientsCategory;
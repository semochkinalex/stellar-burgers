import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { TIngredient } from '../../services/types/data';

import styles from './ingredient-details.module.css';

interface IIngredientDetails {}

const IngredientDetails: React.FC<IIngredientDetails> = () => {
    const { id } = useParams<{id?: string}>();
    const {inspectedIngredient} = useSelector(store => {
        return {
            inspectedIngredient:    
            store.ingredients.buns.find((bun: TIngredient) => bun._id === id)
            ||
            store.ingredients.mains.find((main: TIngredient) => main._id === id)
            ||
            store.ingredients.sauces.find((sauce: TIngredient) => sauce._id === id)
        }
    });

    if (!inspectedIngredient) return null;
    return (
            <section className={styles.container}>
                <p className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</p>
                <img className={styles.image} src={inspectedIngredient.image_large} alt={inspectedIngredient.name} />
                <p className={`text text_type_main-medium ${styles.name}`}>
                    {inspectedIngredient.name}
                </p>
                <ul className={styles.list}>
                    <li className={styles.info}>
                    <p className="text text_type_main-small text_color_inactive">
                        Калории, ккал
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {inspectedIngredient.calories}
                    </p>
                    </li>
                    <li className={styles.info}>
                    <p className="text text_type_main-small text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {inspectedIngredient.proteins}
                    </p>
                    </li>
                    <li className={styles.info}>
                    <p className="text text_type_main-small text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {inspectedIngredient.fat}
                    </p>
                    </li>
                    <li className={styles.info}>
                    <p className="text text_type_main-small text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">
                        {inspectedIngredient.carbohydrates}
                    </p>
                    </li>
                </ul>
            </section>
    );
}

export default IngredientDetails;
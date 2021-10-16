import React from 'react';
import { TIngredient } from '../../services/types/data';
import styles from './ingredient-icon.module.css';

interface IIngredientIcon {
    size?: number;
    last?: boolean;
    ingredient: TIngredient;
};

const IngredientIcon: React.FC<IIngredientIcon> = ({ingredient, last, size}) => {
    if (!ingredient) return null;
    return (
        <div className={styles.element}>
            <img className={styles.image} src={ingredient.image_mobile} alt="Image" />
            {last && <div className={styles.wrapper}><p className={`text text_type_main-default ${styles.number}`}>+{(size || 0) - 8}</p></div>}
        </div>
    );
}

export default IngredientIcon;
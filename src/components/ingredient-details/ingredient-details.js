import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const inspectedIngredient = useSelector(store => store.inspectedElement.inspectedIngredient);
    if (!inspectedIngredient) return null;
    return (
        <>
            <p className="text text_type_main-large">Детали ингредиента</p>
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
        </>
    );
}

export default IngredientDetails;
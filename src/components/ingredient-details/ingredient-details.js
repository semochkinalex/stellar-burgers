import PropTypes from 'prop-types';
import ModalPopup from '../modal-popup/modal-popup';
import styles from './ingredient-details.module.css';
import { IngredientPropTypes } from '../../utils/prop-types'; 

const IngredientDetails = ({isOpen, togglePopup, ingredient}) => {
    if (!ingredient) return null;
    return (
        <ModalPopup isOpen={isOpen} togglePopup={togglePopup}>
            <p className="text text_type_main-large">Детали ингредиента</p>
            <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
            <p className={`text text_type_main-medium ${styles.name}`}>
                {ingredient.name}
            </p>
            <ul className={styles.list}>
                <li className={styles.info}>
                <p className="text text_type_main-small text_color_inactive">
                    Калории, ккал
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                    {ingredient.calories}
                </p>
                </li>
                <li className={styles.info}>
                <p className="text text_type_main-small text_color_inactive">
                    Белки, г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                    {ingredient.proteins}
                </p>
                </li>
                <li className={styles.info}>
                <p className="text text_type_main-small text_color_inactive">
                    Жиры, г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                    {ingredient.fat}
                </p>
                </li>
                <li className={styles.info}>
                <p className="text text_type_main-small text_color_inactive">
                    Углеводы, г
                </p>
                <p className="text text_type_digits-default text_color_inactive">
                    {ingredient.carbohydrates}
                </p>
                </li>
            </ul>
        </ModalPopup>
    );
}

IngredientDetails.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    togglePopup: PropTypes.func.isRequired,
    ingredient: IngredientPropTypes,
}

export default IngredientDetails;
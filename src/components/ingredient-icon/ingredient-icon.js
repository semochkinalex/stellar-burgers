import styles from './ingredient-icon.module.css';

const IngredientIcon = ({ingredient, index}) => {
    return (
        <li className={styles.element} style={{right: `${10*index}px`}}>
            <img className={styles.image} src={ingredient.image_mobile} alt="Image" />
        </li>
    );
}

export default IngredientIcon;
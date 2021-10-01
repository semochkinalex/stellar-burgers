import styles from './ingredient-icon.module.css';

const IngredientIcon = ({ingredient, index, last, size}) => {
    if (!ingredient) return;
    return (
        <li className={styles.element} style={{right: `${10*index}px`}}>
            <img className={styles.image} src={ingredient.image_mobile} alt="Image" />
            {last && <div className={styles.wrapper}><p className={`text text_type_main-default ${styles.number}`}>+{size-8}</p></div>}
        </li>
    );
}

export default IngredientIcon;
import styles from './ingredient-icon.module.css';

const IngredientIcon = ({ingredient, last, size}) => {
    if (!ingredient) return;
    return (
        <div className={styles.element}>
            <img className={styles.image} src={ingredient.image_mobile} alt="Image" />
            {last && <div className={styles.wrapper}><p className={`text text_type_main-default ${styles.number}`}>+{size-8}</p></div>}
        </div>
    );
}

export default IngredientIcon;
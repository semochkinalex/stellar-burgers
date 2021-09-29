import BurgerIndredientSkeleton from '../burger-ingredient-skeleton/burger-ingredient-skeleton';
import styles from './burger-skeletons.module.css';

const BurgerSkeletons = () => {
    const array = Array(4).fill(null).map((u, i) => i);
    return (
        <>
            <span className={styles.title}>qwdqwdqwd</span>
            <div className={styles.section}>
                {array.map((el, i) => <BurgerIndredientSkeleton key={i} />)}
            </div>
            <span className={styles.title}>qwdqwdqwd</span>
            <div className={styles.section}>
                {array.map((el, i) => <BurgerIndredientSkeleton key={i} />)}
            </div>
            <span className={styles.title}>qwdqwdqwd</span>
            <div className={styles.section}>
                {array.map((el, i) => <BurgerIndredientSkeleton key={i} />)}
            </div>
        </>
    );
}

export default BurgerSkeletons;
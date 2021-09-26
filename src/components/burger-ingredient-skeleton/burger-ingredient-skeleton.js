import styles from './burger-ingredient-skeleton.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIndredientSkeleton = () => {
    return (
            <li className={styles.card}>
                <div className={styles.image}></div>
                <div className={styles.price}>
                    <span className={styles.money}>125125</span>
                    <div className={styles.icon}></div>
                </div>
                <span className={styles.name}>qwdqwdqwdqwdqwdqwd</span>
                <span className={styles.name}>qwdqwdqwd</span>
            </li>
    );
}

export default BurgerIndredientSkeleton;
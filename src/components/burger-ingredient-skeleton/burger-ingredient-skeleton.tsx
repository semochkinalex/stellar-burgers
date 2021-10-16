import React from 'react';
import styles from './burger-ingredient-skeleton.module.css';

interface IBurgerIngredientSkeleton {};

const BurgerIndredientSkeleton: React.FC<IBurgerIngredientSkeleton> = () => {
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
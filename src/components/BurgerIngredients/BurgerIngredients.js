import styles from './BurgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

const BurgerIngredients = () => {
    const [selectedMeal, setSelectedMeal] = useState("buns");

    const handleMealChange = (value) => {
        setSelectedMeal(value);
    }
    return (
        <section className={styles.menu}>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div className={styles.tab}>
              <Tab value="buns" active={selectedMeal === 'buns'} onClick={handleMealChange}>
                Булки
              </Tab>
              <Tab value="sauce" active={selectedMeal === 'sauce'} onClick={handleMealChange}>
                Соусы
              </Tab>
              <Tab value="main" active={selectedMeal === 'main'} onClick={handleMealChange}>
                Начинки
              </Tab>
            </div>
        </section>
    );
}

export default BurgerIngredients;
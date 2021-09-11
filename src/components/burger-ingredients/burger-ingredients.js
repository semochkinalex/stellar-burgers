import {Tab} from '../tab/tab';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useRef, useState, memo, useCallback } from 'react';

const BurgerIngredients = memo(() => {
    const bunsRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
  
    const [selectedMeal, setSelectedMeal] = useState("buns");

    const handleMealChange = useCallback((evt) => {
        setSelectedMeal(evt);
    }, []);
    
    const handleScroll = () => {
      const buns = bunsRef.current.getBoundingClientRect();
      const sauces = sauceRef.current.getBoundingClientRect();
      buns.y <= 0 ? (sauces.y <= 0 ? setSelectedMeal('main') : setSelectedMeal('sauce')): setSelectedMeal('buns');
    }

    return (
        <section className={styles.menu}>
            <p className={`text text_type_main-large ${styles.title}`}>
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
            <section className={styles.page} id="ingredient-scroll" onScroll={handleScroll}>
                <IngredientsCategory title="Булки" ref={bunsRef} />
                <IngredientsCategory title="Соусы" ref={sauceRef} />
                <IngredientsCategory title="Начинки" ref={mainRef} />
            </section>
        </section>
    );
});

export default BurgerIngredients;
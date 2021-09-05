import {Tab} from '../tab/tab';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const BurgerIngredients = memo(() => {
    const bunsRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
  
    const [selectedMeal, setSelectedMeal] = useState("buns");

    const handleMealChange = useCallback((evt) => {
        setSelectedMeal(evt);
    }, []);

    useEffect(() => {
      if (selectedMeal === 'buns') return bunsRef.current.scrollIntoView();
      if (selectedMeal === 'sauce') return sauceRef.current.scrollIntoView();
      if (selectedMeal === 'main') return mainRef.current.scrollIntoView();
    }, [selectedMeal]);

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
            <section className={styles.page}>
                <IngredientsCategory title="Булки" ref={bunsRef} />
                <IngredientsCategory title="Соусы" ref={sauceRef} />
                <IngredientsCategory title="Начинки" ref={mainRef} />
            </section>
        </section>
    );
});

export default BurgerIngredients;
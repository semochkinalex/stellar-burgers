import PropTypes from 'prop-types';
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import styles from './burger-ingredients.module.css';
import {FoodPropTypes} from '../../utils/prop-types.js';
import useWindowSize from '../../utils/useWindowSize.js';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../burger-ingredient/burger-ingredient.js';

const BurgerIngredients = memo(({ingredients, selectIngredient}) => {
    const bunsRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const {width, height} = useWindowSize();

    const [mobileView, setMobileView] = useState(false);
    
    const [buns, setBuns] = useState([]);
    const [main, setMain  ] = useState([]);
    const [sauce, setSauce] = useState([]);
  
    const [selectedMeal, setSelectedMeal] = useState("buns");

    const handleMealChange = useCallback((evt) => {
        setSelectedMeal(evt);
    }, []);

    const resetData = () => {
      setBuns([]);
      setMain([]);
      setSauce([]);
    }

    // Сортировка из общей информации по категориям buns, main, sauce;
    useEffect(() => {
      if (buns.length || main.length || sauce.length) resetData();
      ingredients.forEach((food) => {
        switch (food.type) {
          case "bun":
            setBuns((arr) => [...arr, food]);
            break;
          case "main":
            setMain((arr) => [...arr, food]);
            break;
          default:
            setSauce((arr) => [...arr, food]);
            break;
        }
      });
    }, [ingredients]);

    useEffect(() => {
      setMobileView(width < 650);
    }, [width, height])

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
              <div className={styles.container} name="buns" ref={bunsRef}>
                <h3 className={`text text_type_main-medium ${styles.name}`}>
                    Булки
                </h3>
                <ul className={styles.list}>
                    {buns.map((bun) => {
                      return <BurgerIngredient mobile={mobileView} ingredient={bun} key={bun._id} onSelect={selectIngredient} />
                    })}
                </ul>
              </div>
              <div className={styles.container} name="sauce" ref={sauceRef}>
              <h3 className={`text text_type_main-medium ${styles.name}`}>
                 Соусы
                </h3>
              <ul className={styles.list}>
                 {sauce.map((sauce) => {
                   return <BurgerIngredient mobile={mobileView} ingredient={sauce} key={sauce._id} onSelect={selectIngredient} />
                 })}
              </ul>
              </div>
              <div className={styles.container} name="main" ref={mainRef}>
              <h3 className={`text text_type_main-medium ${styles.name}`}>
                  Начинки
              </h3>
                <ul className={styles.list}>
                    {main.map((main) => {
                      return <BurgerIngredient mobile={mobileView} ingredient={main} key={main._id} onSelect={selectIngredient} />
                    })}
                </ul>
              </div>
            </section>
        </section>
    );
});

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(FoodPropTypes),
}

export default BurgerIngredients;
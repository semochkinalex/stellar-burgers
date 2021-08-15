import data from '../../utils/data.js';
import { useEffect, useReducer, useRef, useState } from 'react';
import styles from './BurgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../burger-ingredient/burger-ingredient.js';

const BurgerIngredients = () => {
    const contentRef = useRef(null); // Скролл, когда меняем вкладку
    
    const [buns, setBuns] = useState([]);
    const [main, setMain  ] = useState([]);
    const [sauce, setSauce] = useState([]);
  
    const [selectedMeal, setSelectedMeal] = useState("buns");

    const handleMealChange = (value) => {
        setSelectedMeal(value);
    }

    // Сортировка из общей информации по категориям buns, main, sauce;
    useEffect(() => {
      data.forEach((food) => {
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
    }, []);

    useEffect(() => {
      if (!contentRef.current) return;
      contentRef.current.scrollTop = 0;
    }, [selectedMeal]);

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
            <section className={styles.page} ref={contentRef}>
              <div className={styles.container} style={{order: `${selectedMeal === 'buns' ? -1 : 3}`}}>
                <h3 className="text text_type_main-medium">
                    Булки
                </h3>
                <ul className={styles.list}>
                    {buns.map((bun, i) => {
                      return <BurgerIngredient data={bun} key={i} />
                    })}
                </ul>
              </div>
              <div className={styles.container} style={{order: `${selectedMeal === 'sauce' ? -1 : 3}`}}>
              <h3 className="text text_type_main-medium">
                 Соусы
                </h3>
              <ul className={styles.list}>
                 {sauce.map((sauce, i) => {
                   return <BurgerIngredient data={sauce} key={i} />
                 })}
              </ul>
              </div>
              <div className={styles.container} style={{order: `${selectedMeal === 'main' ? -1 : 3}`}}>
              <h3 className="text text_type_main-medium">
                  Начинки
              </h3>
                <ul className={styles.list}>
                    {main.map((main, i) => {
                      return <BurgerIngredient data={main} key={i} />
                    })}
                </ul>
              </div>
            </section>
        </section>
    );
}

export default BurgerIngredients;
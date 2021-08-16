import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import {FoodPropTypes} from '../../utils/prop-types.js';
import useWindowSize from '../../utils/useWindowSize.js';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../burger-ingredient/burger-ingredient.js';

const BurgerIngredients = ({data}) => {
    const contentRef = useRef(null); // Скролл, когда меняем вкладку

    const {width, height} = useWindowSize();

    const [mobileView, setMobileView] = useState(false);
    
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
      setMobileView(width < 650);
    }, [width, height])

    useEffect(() => {
      if (!contentRef.current) return;
      contentRef.current.scrollTop = 0;
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
            <section className={styles.page} ref={contentRef}>
              <div className={styles.container} style={{order: `${selectedMeal === 'buns' ? -1 : 3}`}}>
                <h3 className={`text text_type_main-medium ${styles.name}`}>
                    Булки
                </h3>
                <ul className={styles.list}>
                    {buns.map((bun, i) => {
                      return <BurgerIngredient mobile={mobileView} data={bun} key={i} />
                    })}
                </ul>
              </div>
              <div className={styles.container} style={{order: `${selectedMeal === 'sauce' ? -1 : 3}`}}>
              <h3 className={`text text_type_main-medium ${styles.name}`}>
                 Соусы
                </h3>
              <ul className={styles.list}>
                 {sauce.map((sauce, i) => {
                   return <BurgerIngredient mobile={mobileView} data={sauce} key={i} />
                 })}
              </ul>
              </div>
              <div className={styles.container} style={{order: `${selectedMeal === 'main' ? -1 : 3}`}}>
              <h3 className={`text text_type_main-medium ${styles.name}`}>
                  Начинки
              </h3>
                <ul className={styles.list}>
                    {main.map((main, i) => {
                      return <BurgerIngredient mobile={mobileView} data={main} key={i} />
                    })}
                </ul>
              </div>
            </section>
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(FoodPropTypes),
}

export default BurgerIngredients;
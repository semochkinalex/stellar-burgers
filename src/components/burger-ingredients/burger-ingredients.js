import {Tab} from '../tab/tab';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import useWindowSize from '../../utils/useWindowSize.js';
import {IngredientPropTypes} from '../../utils/prop-types.js';
import IngredientContext from '../../contexts/ingredients-context';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useEffect, useRef, useState, memo, useCallback, useMemo, useContext } from 'react';

const BurgerIngredients = memo(({inspectIngredient}) => {
    const {ingredients} = useContext(IngredientContext);
    
    const bunsRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const {width, height} = useWindowSize();

    const [mobileView, setMobileView] = useState(false);
    
    const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
    const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);
    const sauce = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  
    const [selectedMeal, setSelectedMeal] = useState("buns");

    const handleMealChange = useCallback((evt) => {
        setSelectedMeal(evt);
    }, []);

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
                <IngredientsCategory ingredients={buns} title="Булки" inspectIngredient={inspectIngredient} mobile={mobileView} ref={bunsRef} />
                <IngredientsCategory ingredients={sauce} title="Соусы"  inspectIngredient={inspectIngredient} mobile={mobileView} ref={sauceRef} />
                <IngredientsCategory ingredients={main} title="Начинки"  inspectIngredient={inspectIngredient} mobile={mobileView} ref={mainRef} />
            </section>
        </section>
    );
});

export default BurgerIngredients;
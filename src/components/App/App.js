import api from '../../utils/api';
import AppHeader from '../app-header/app-header.js';
import {dataConstructor} from '../../utils/data.js';
import HeaderPopup from '../header-popup/header-popup.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './App.module.css';
import { useEffect, useState } from 'react';

function App() {

  const [isIngredientPopupOpen, setIsIngredientPopupOpen] = useState(true);

  const [ingredients, setIngredients] = useState([]);
  const [isHeaderPopupShown, setIsHeaderPopupShown] = useState(false);

  const toggleHeaderPopup = () => {
    setIsHeaderPopupShown(!isHeaderPopupShown);
  }

  const toggleIngredientPopup = () => {
    setIsIngredientPopupOpen(!isIngredientPopupOpen);
  }

  useEffect(() => {
      api.getIngredients()
      .then(({data}) => {
        setIngredients(data);
      })
      .catch(() => {
        console.log("Произошла ошибка при получении ингредиентов.")
      })
  }, [])

  return (
    <>
      {/* Popups */}
      <IngredientDetails isOpen={isIngredientPopupOpen} togglePopup={toggleIngredientPopup} ingredient={ingredients[5]} />
      <HeaderPopup isShown={isHeaderPopupShown} togglePopup={toggleHeaderPopup} />
      {/* Content */}
      <AppHeader togglePopup={toggleHeaderPopup} />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor data={dataConstructor} />
      </main>
    </>
  );
}

export default App;

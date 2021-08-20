import api from '../../utils/api';
import AppHeader from '../app-header/app-header.js';
import {dataConstructor} from '../../utils/data.js';
import HeaderPopup from '../header-popup/header-popup.js';
import OrderDetails from '../order-details/order-details';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './App.module.css';
import { useEffect, useState } from 'react';

function App() {

  const [areOrderDetailsOpened, setAreOrderDetailsOpened] = useState(false); // Заменить на true, чтобы показать

  const [selectedIngredient, setSelectedIngredient] = useState(null); // Здесь должен быть изначально объект, но propTypes ругается
  const [isIngredientPopupOpen, setIsIngredientPopupOpen] = useState(true);

  const [ingredients, setIngredients] = useState([]);
  const [isHeaderPopupShown, setIsHeaderPopupShown] = useState(false);

  const toggleHeaderPopup = () => {
    setIsHeaderPopupShown(!isHeaderPopupShown);
  }

  const toggleIngredientPopup = () => {
    setIsIngredientPopupOpen(!isIngredientPopupOpen);
  }

  const toggleOrderDetails = () => {
    setAreOrderDetailsOpened(!areOrderDetailsOpened);
  }

  const handleInspectIngredient = (ingredient) => {
      setSelectedIngredient(ingredient);
      setIsIngredientPopupOpen(true);
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
      <OrderDetails isOpen={areOrderDetailsOpened} togglePopup={toggleOrderDetails} />
      <IngredientDetails isOpen={isIngredientPopupOpen} togglePopup={toggleIngredientPopup} ingredient={selectedIngredient} />
      <HeaderPopup isShown={isHeaderPopupShown} togglePopup={toggleHeaderPopup} />
      {/* Content */}
      <AppHeader togglePopup={toggleHeaderPopup} />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} selectIngredient={handleInspectIngredient} />
        <BurgerConstructor data={dataConstructor} />
      </main>
    </>
  );
}

export default App;

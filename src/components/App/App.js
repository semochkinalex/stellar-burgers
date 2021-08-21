import api from '../../utils/api';
import { useEffect, useState } from 'react';
import ModalPopup from '../modal-popup/modal-popup';
import AppHeader from '../app-header/app-header.js';
import {dataConstructor} from '../../utils/data.js';
import HeaderPopup from '../header-popup/header-popup.js';
import OrderDetails from '../order-details/order-details';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './app.module.css';

function App() {

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); // Заменить на true, чтобы показать

  const [selectedIngredient, setSelectedIngredient] = useState(null); // Здесь должен быть изначально объект, но propTypes ругается
  const [isIngredientPopupOpen, setIsIngredientPopupOpen] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [isHeaderPopupShown, setIsHeaderPopupShown] = useState(false);

  const toggleHeaderPopup = () => {
    setIsHeaderPopupShown(!isHeaderPopupShown);
  }

  const toggleIngredientPopup = () => {
    setIsIngredientPopupOpen(!isIngredientPopupOpen);
  }

  const toggleOrderDetails = () => {
    setIsOrderDetailsOpened(!isOrderDetailsOpened);
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
      {isOrderDetailsOpened &&
        <ModalPopup togglePopup={toggleOrderDetails}>
          <OrderDetails />
        </ModalPopup>
      }
      {isIngredientPopupOpen && 
      <ModalPopup togglePopup={toggleIngredientPopup}>
        <IngredientDetails ingredient={selectedIngredient} />
      </ModalPopup>}
      <HeaderPopup isShown={isHeaderPopupShown} togglePopup={toggleHeaderPopup} />
      {/* Content */}
      <AppHeader togglePopup={toggleHeaderPopup} />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} selectIngredient={handleInspectIngredient} />
        <BurgerConstructor data={dataConstructor} handleOrder={toggleOrderDetails} />
      </main>
    </>
  );
}

export default App;

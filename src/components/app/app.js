import api from '../../utils/api';
import { useEffect, useReducer, useState } from 'react';
import ModalPopup from '../modal-popup/modal-popup';
import AppHeader from '../app-header/app-header.js';
import HeaderPopup from '../header-popup/header-popup.js';
import OrderDetails from '../order-details/order-details';
import IngredientContext from '../../contexts/ingredients-context';
import ConstructorContext from '../../contexts/constructor-context';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './app.module.css';

const constructorReducer = (state, {type, data}) => {
  switch (type) {
    case "add-bun":
      return {...state, bun: data};
    case "add-main":
      return {...state, ingredients: [...state.ingredients, data]};
    case "remove-main":
      return {...state, ingredients: state.ingredient.filter((ingredient) => ingredient._id !== data.id)};
    default:
      throw new Error("Error in Reducer: " + type);
  }
}

function App() {
  const [constructorState, constructorDispatch] = useReducer(constructorReducer, {bun: {}, ingredients: []});

  const [currentOrder, setCurrentOrder] = useState({});
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); // Заменить на true, чтобы показать
  const [selectedIngredient, setSelectedIngredient] = useState(null); // Здесь должен быть изначально объект, но propTypes ругается
  const [isIngredientPopupOpen, setIsIngredientPopupOpen] = useState(false);
  const [isHeaderPopupShown, setIsHeaderPopupShown] = useState(false);

  const [ingredients, setIngredients] = useState([]);

  const toggleHeaderPopup = () => {
    setIsHeaderPopupShown(!isHeaderPopupShown);
  }

  const toggleIngredientPopup = () => {
    setIsIngredientPopupOpen(!isIngredientPopupOpen);
  }

  const toggleOrderDetails = () => {
    setIsOrderDetailsOpened(!isOrderDetailsOpened);
  }

  const inspectIngredient = (ingredient) => {
    toggleIngredientPopup();
    setSelectedIngredient(ingredient);
  }

  const order = (ingredients) => {
    api.handleOrder(ingredients)
    .then(({name, order: {number}}) => {
        toggleOrderDetails();
        setCurrentOrder({
          name,
          number,
        });
    })
    .catch((err) => {
      console.log("Произошла ошибка при создании заказа");
    })
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
          <OrderDetails order={currentOrder} />
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
        <IngredientContext.Provider value={{ingredients}}>
          <ConstructorContext.Provider value={{constructorState, constructorDispatch}}>
            <BurgerIngredients inspectIngredient={inspectIngredient} />
            <BurgerConstructor order={order} />
          </ConstructorContext.Provider>
        </IngredientContext.Provider>
      </main>
    </>
  );
}

export default App;

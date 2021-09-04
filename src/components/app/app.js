import api from '../../utils/api';
import ModalPopup from '../modal-popup/modal-popup';
import AppHeader from '../app-header/app-header.js';
import { useEffect, useReducer, useState } from 'react';
import HeaderPopup from '../header-popup/header-popup.js';
import OrderDetails from '../order-details/order-details';
import ConstructorContext from '../../contexts/constructor-context';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import useWindowSize from '../../utils/useWindowSize';
import { SWITCH_IS_MOBILE_VALUE } from '../../services/actions/index';
import { CLOSE_INSPECTED_INGREDIENT, CLOSE_ORDER_POPUP } from '../../services/actions/popups-info';

import { useDispatch, useSelector } from 'react-redux';
import {
  INGREDIENT_REQUEST_FAIL,
  INGREDIENT_REQUEST_PENDING,
  INGREDIENT_REQUEST_SUCCESS,
} from '../../services/actions/ingredients';

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
  const dispatch = useDispatch();
  const {isInspectedElementPopupOpen, isOrderPopupOpen} = useSelector(state => ({
      isInspectedElementPopupOpen: state.popups.inspectedIngredientPopupOpen,
      isOrderPopupOpen: state.popups.orderPopupOpen,
  }))
  const [constructorState, constructorDispatch] = useReducer(constructorReducer, {bun: {
    "_id": "60d3b41abdacab0026a733c6",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
}, ingredients: [
  {
    "_id": "60d3b41abdacab0026a733c8",
    "name": "Филе Люминесцентного тетраодонтимформа",
    "type": "main",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
    "__v": 0
},
{
    "_id": "60d3b41abdacab0026a733c9",
    "name": "Мясо бессмертных моллюсков Protostomia",
    "type": "main",
    "proteins": 433,
    "fat": 244,
    "carbohydrates": 33,
    "calories": 420,
    "price": 1337,
    "image": "https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v": 0
}
]});

  const {width} = useWindowSize();

  useEffect(() => {
      dispatch({type: SWITCH_IS_MOBILE_VALUE, value: width});
  }, [width]);

  useEffect(() => {
      dispatch({type: INGREDIENT_REQUEST_PENDING});
      api.getIngredients()
      .then((res) => {
        if (res.data && res.success) return dispatch({type: INGREDIENT_REQUEST_SUCCESS, ingredients: res.data});
        throw new Error("Произошла ошибка при получении ингредиентов.");
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: INGREDIENT_REQUEST_FAIL});
      })
  }, [])

  return (
    <>
      {/* Popups */}
      {isOrderPopupOpen &&
        <ModalPopup actionType={CLOSE_ORDER_POPUP}>
          <OrderDetails />
        </ModalPopup>
      }

      {isInspectedElementPopupOpen && 
      <ModalPopup actionType={CLOSE_INSPECTED_INGREDIENT}>
        <IngredientDetails />
      </ModalPopup>}

      <HeaderPopup />
      {/* Content */}
      <AppHeader />
      <main className={styles.main}>
          <ConstructorContext.Provider value={{constructorState, constructorDispatch}}>
            <BurgerIngredients />
            <BurgerConstructor />
          </ConstructorContext.Provider>
      </main>
    </>
  );
}

export default App;

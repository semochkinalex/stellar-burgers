import api from '../../utils/api';
import ModalPopup from '../modal-popup/modal-popup';
import AppHeader from '../app-header/app-header.js';
import { useEffect } from 'react';
import HeaderPopup from '../header-popup/header-popup.js';
import OrderDetails from '../order-details/order-details';
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

function App() {
  const dispatch = useDispatch();
  const {isInspectedElementPopupOpen, isOrderPopupOpen} = useSelector(state => ({
      isInspectedElementPopupOpen: state.popups.inspectedIngredientPopupOpen,
      isOrderPopupOpen: state.popups.orderPopupOpen,
  }));

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

      <AppHeader />
      <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
      </main>
    </>
  );
}

export default App;

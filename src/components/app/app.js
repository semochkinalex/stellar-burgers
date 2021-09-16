import { useEffect } from 'react';
import api from '../../utils/api';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import { DndProvider } from "react-dnd";
import { getCookie, setCookie } from '../../utils/cookie';
import { Switch, Route } from 'react-router-dom';
import ModalPopup from '../modal-popup/modal-popup';
import AppHeader from '../app-header/app-header.js';
import { HTML5Backend } from "react-dnd-html5-backend";
import useWindowSize from '../../utils/useWindowSize';
import { login, UPDATE_ACCESS_TOKEN, UPDATE_USER_INFO } from '../../services/actions/user';
import HeaderPopup from '../header-popup/header-popup.js';
import OrderDetails from '../order-details/order-details';
import { CLOSE_ORDER_POPUP } from '../../services/actions/order';
import { SWITCH_IS_MOBILE_VALUE } from '../../services/actions/index';
import { ProtectedRoute } from '../protected-route.js/protected-route';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CLOSE_INSPECTED_INGREDIENT } from '../../services/actions/inspected-element';

import { useDispatch, useSelector } from 'react-redux';

import {
  getIngredients
} from '../../services/actions/ingredients';

import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const {isInspectedElementPopupOpen, isOrderPopupOpen} = useSelector(state => ({
      isInspectedElementPopupOpen: state.inspectedElement.inspectedIngredientPopupOpen,
      isOrderPopupOpen: state.order.orderPopupOpen,
  }));

  const {width} = useWindowSize();

  useEffect(() => {
      dispatch({type: SWITCH_IS_MOBILE_VALUE, value: width});
  }, [dispatch, width]);

  useEffect(() => {
      dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) return;
    api.updateToken(token)
    .then(({success, accessToken, refreshToken}) => {
      if (success) return api.getUserInfo(accessToken).then(({success, user : {name, email}}) => {
          if (success) return dispatch(login(name, email, accessToken, refreshToken));
      })
      // Обрабатываем обе ошибки ?
      throw new Error("Error in API call");
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Switch>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <ProtectedRoute path="/constructor" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </ProtectedRoute>
        </Switch>
      </main>
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
    </>
  );
}

export default App;

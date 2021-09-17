import { useCallback, useEffect } from 'react';
import api from '../../utils/api';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import { DndProvider } from "react-dnd";
import { useHistory } from 'react-router-dom';
// import { login } from '../../services/actions/user';
import { getCookie, setCookie } from '../../utils/cookie';
import { Switch, Route } from 'react-router-dom';
import ModalPopup from '../modal-popup/modal-popup';
import AppHeader from '../app-header/app-header.js';
import { HTML5Backend } from "react-dnd-html5-backend";
import useWindowSize from '../../utils/useWindowSize';
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
import { getNewUserToken, getUserInfo, updateAccessToken } from '../../services/actions/user';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {accessToken, isOrderPopupOpen, isInspectedElementPopupOpen} = useSelector(state => ({
    accessToken: state.user.token,
      isInspectedElementPopupOpen: state.inspectedElement.inspectedIngredientPopupOpen,
      isOrderPopupOpen: state.order.orderPopupOpen,
  }));

  const {width} = useWindowSize();

  useEffect(() => {
      dispatch({type: SWITCH_IS_MOBILE_VALUE, value: width});
  }, [dispatch, width]);

  useEffect(() => {
    if (Boolean(accessToken)) return dispatch(getIngredients());
  }, [dispatch, accessToken]);

  useEffect(() => {
    const oldToken = getCookie("token");
    if (oldToken) return attemptLogin(oldToken);
  }, []);

  const attemptLogin = useCallback(refreshToken => {
    api.updateToken(refreshToken)
    .then(({success, accessToken, refreshToken}) => {
      if (success) {
        setCookie("token", refreshToken);
        dispatch(getUserInfo(accessToken));
        dispatch(updateAccessToken(accessToken));
        return history.replace({pathname: "/constructor"});
      }
      throw new Error("Couldn't refresh token");
    }).catch((message) => console.log(message));
  }, [history, dispatch, api]);

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

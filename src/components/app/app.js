import { useCallback, useEffect } from 'react';
import api from '../../utils/api';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import { DndProvider } from "react-dnd";
import { useHistory } from 'react-router-dom';
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
import { getUserInfo, updateAccessToken } from '../../services/actions/user';
import ForgotPassword from '../forgot-password/forgot-password';
import ResetPassword from '../reset-password/reset-password';
import UserProfile from '../profile/profile';

/*
  404 страница
  попапы с сообщениями об ошибке
  уведомления об успехе
  suspense (?)
  анимация загрузки
*/

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {isOrderPopupOpen, isInspectedElementPopupOpen} = useSelector(state => ({
      isInspectedElementPopupOpen: state.inspectedElement.inspectedIngredientPopupOpen,
      isOrderPopupOpen: state.order.orderPopupOpen,
  }));

  const {width} = useWindowSize();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
      dispatch({type: SWITCH_IS_MOBILE_VALUE, value: width});
  }, [dispatch, width]);

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
        const previousPage = history.location.state ? history.location.state.from.pathname : "/";
        return history.replace({pathname: previousPage});
      }
      throw new Error("Couldn't refresh token");
    }).catch((message) => console.log(message));
  }, [history, dispatch, api]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Switch>
        <Route path="/login" exact={true}>
            <SignIn />
          </Route>
          <Route path="/register" exact={true}>
            <SignUp />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </Route>
          <ProtectedRoute path="/ingredients/:id" exact={true}>
            <IngredientDetails />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <UserProfile />
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

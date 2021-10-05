import api from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import useWindowSize from '../../utils/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { CLOSE_ORDER_POPUP } from '../../services/actions/order';
import { SWITCH_IS_MOBILE_VALUE } from '../../services/actions/index';
import { ProtectedRoute } from '../protected-route.js/protected-route';
import { CLOSE_INSPECTED_INGREDIENT } from '../../services/actions/inspected-element';

import { SignIn, SignUp, MainPage, UserProfile, ResetPassword, ForgotPassword, IngredientDetails, ModalPopup, AppHeader, HeaderPopup, OrderDetails } from '../../pages';

import { useDispatch, useSelector } from 'react-redux';

import {
  getIngredients
} from '../../services/actions/ingredients';

import styles from './app.module.css';
import { updateToken } from '../../services/actions/user';
import Feed from '../../pages/feed/feed';
import OrderSummary from '../order-summary/order-summary';
import { getInitialOrders } from '../../services/actions/orders';
import { WS_CONNECTION_START } from '../../services/actions/socket';

function App() {
  const history = useHistory();
  const location = useLocation();
  
  const background = (history.action === "PUSH" || history.action === "REPLACE") && location.state && location.state?.background;
  
  const dispatch = useDispatch();
  const {loggedIn, isOrderPopupOpen} = useSelector(state => ({
      isInspectedElementPopupOpen: state.inspectedElement.inspectedIngredientPopupOpen,
      isOrderPopupOpen: state.order.orderPopupOpen,
      isOrderSummaryPopupOpen: state.orders.orderPopupOpen,
      loggedIn: Boolean(state.user.token),
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

  useEffect(() => {
    if (loggedIn) {
      const previousPage = history.location.state?.from?.pathname ? history.location.state.from.pathname : "/";
      return history.replace({pathname: previousPage});
    }
  }, [loggedIn])

  const attemptLogin = useCallback(refreshToken => {
    dispatch(updateToken(refreshToken));
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
          {!background && <Route path="/feed/:id" exact={true}>
            <section className={styles.center}>
              <OrderSummary />
            </section>
          </Route>}
          <Route path="/feed">
            <Feed />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <ProtectedRoute path="/profile">
            <UserProfile />
          </ProtectedRoute>
          {!background && <Route path="/ingredients/:id" exact={true}>
            <section className={styles.center}>
              <IngredientDetails />
            </section>
          </Route>}
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </main>

      {isOrderPopupOpen &&
        <ModalPopup actionType={CLOSE_ORDER_POPUP}>
          <OrderDetails />
        </ModalPopup>
      }

      {background && 
      <Route path="/ingredients/:id" exact={true}>
        <ModalPopup actionType={null}>
            <IngredientDetails />
        </ModalPopup>
      </Route>
      }

      {background && 
      <Route path="/feed/:id" exact={true}>
        <ModalPopup actionType={null} link={"feed"}>
            <OrderSummary />
        </ModalPopup>
      </Route>
      }
      
      {background && 
      <Route path="/profile/orders/:id" exact={true}>
        <ModalPopup actionType={null} link={"profile/orders"}>
            <OrderSummary />
        </ModalPopup>
      </Route>
      }

      <HeaderPopup />
    </>
  );
}

export default App;
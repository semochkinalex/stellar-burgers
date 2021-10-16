import api from '../../utils/api';
import { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { CLOSE_ORDER_POPUP } from '../../services/constants/index';
import { SWITCH_IS_MOBILE_VALUE } from '../../services/constants/index';
import { ProtectedRoute } from '../protected-route.js/protected-route';

import { SignIn, SignUp, MainPage, UserProfile, ResetPassword, ForgotPassword, IngredientDetails, ModalPopup, AppHeader, HeaderPopup, OrderDetails } from '../../pages';

import { useDispatch, useSelector } from '../../services/hooks';

import {
  getIngredients
} from '../../services/actions/ingredients';

import styles from './app.module.css';
import { getUsersOrderHistory, updateToken } from '../../services/actions/user';
import Feed from '../../pages/feed/feed';
import OrderSummary from '../order-summary/order-summary';
import { getLocalStorageKey } from '../../utils/use-local-storage';

import { IHistoryState, ILocationState } from '../../services/types/data';

function App() {
  const history: IHistoryState = useHistory();
  const location: ILocationState = useLocation();

  const background = (history.action === "PUSH" || history.replace === "REPLACE") && location.state && location.state.background;
  
  const dispatch = useDispatch();

  const {token, loggedIn, isOrderPopupOpen} = useSelector(state => ({
    token: state.user.token,
    loggedIn: Boolean(state.user.token),
    isOrderPopupOpen: state.order.orderPopupOpen,
  }));

  // const {width} = useWindowSize();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (loggedIn) dispatch(getUsersOrderHistory(token));
  }, [token])

  // useEffect(() => {
  //     dispatch({type: SWITCH_IS_MOBILE_VALUE, value: width});
  // }, [dispatch, width]);

  useEffect(() => {
    const oldToken = getLocalStorageKey("token");
    if (oldToken && !loggedIn) return attemptLogin(oldToken);
  }, []);

  const attemptLogin = useCallback(refreshToken => {
    dispatch(updateToken(refreshToken));
  }, [history, dispatch, api]);
  

  useEffect(() => {
    if (loggedIn) {
      const previousPage = history.location.pathname;
      return history.replace({pathname: previousPage});
    }
  }, [loggedIn])


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
          {!background && <Route path="/ingredients/:id" exact={true}>
            <section className={styles.center}>
              <IngredientDetails />
            </section>
          </Route>}
          {!background && 
          <Route path="/feed/:id" exact={true}>
            <section className={styles.center}>
              <OrderSummary />
            </section>
          </Route>}
          <Route path="/feed">
            <Feed />
          </Route>
          <ProtectedRoute exact path={"/profile/orders/:id"}>
            <section className={styles.center}>
              <OrderSummary />
            </section>
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <UserProfile />
          </ProtectedRoute>
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
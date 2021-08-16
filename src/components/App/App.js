import data from '../../utils/data.js';
import AppHeader from '../AppHeader/app-header.js';
import HeaderPopup from '../header-popup/header-popup.js';
import {dataConstructor} from '../../utils/data.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import styles from './App.module.css';
import { useState } from 'react';

function App() {

  const [isHeaderPopupShown, setIsHeaderPopupShown] = useState(false);

  const toggleHeaderPopup = () => {
    setIsHeaderPopupShown(!isHeaderPopupShown);
  }

  return (
    <>
      <HeaderPopup isShown={isHeaderPopupShown} togglePopup={toggleHeaderPopup} />
      <AppHeader togglePopup={toggleHeaderPopup} />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={dataConstructor} />
      </main>
    </>
  );
}

export default App;

import api from '../../utils/api';
import AppHeader from '../app-header/app-header.js';
import HeaderPopup from '../header-popup/header-popup.js';
import {dataConstructor} from '../../utils/data.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import styles from './App.module.css';
import { useEffect, useState } from 'react';

function App() {

  const [ingredients, setIngredients] = useState([]);
  const [isHeaderPopupShown, setIsHeaderPopupShown] = useState(false);

  const toggleHeaderPopup = () => {
    setIsHeaderPopupShown(!isHeaderPopupShown);
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
      <HeaderPopup isShown={isHeaderPopupShown} togglePopup={toggleHeaderPopup} />
      <AppHeader togglePopup={toggleHeaderPopup} />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor data={dataConstructor} />
      </main>
    </>
  );
}

export default App;

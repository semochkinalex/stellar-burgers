import AppHeader from '../AppHeader/AppHeader.js';
import {dataConstructor} from '../../utils/data.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';

import styles from './App.module.css';

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor data={dataConstructor} />
      </main>
    </>
  );
}

export default App;

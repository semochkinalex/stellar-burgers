import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';

import styles from './App.module.css';

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
      </main>
    </>
  );
}

export default App;

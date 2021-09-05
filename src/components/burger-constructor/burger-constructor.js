import PropTypes from 'prop-types';
import {memo, useContext, useMemo} from 'react';
import styles from './burger-constructor.module.css';
import BurgerCheck from '../burger-check/burger-check';
import ConstructorItem from '../constructor-item/constructor-item';
import { useSelector } from 'react-redux';

const BurgerConstructor = memo(() => {
    const bun = useSelector(store => store.burger.bun);
    const ingredients = useSelector(store => store.burger.ingredients);

    return (
        <section className={styles.constructor}>
            { Object.keys(bun).length || ingredients.length ? 
                <>
                <ul className={styles.list}>
                    {Object.keys(bun).length ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="top" card={bun} /> : ''}
                    <div className={styles.content}>
                        {ingredients.map((card, index) => {     
                            return <ConstructorItem card={card} key={index} />
                        })}
                    </div>
                    {Object.keys(bun).length ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="bottom" card={bun} /> : ''}
                </ul>
                <BurgerCheck sum={0} />
                </>
            : 
                <p className={`text text_type_main-large ${styles.none}`}>
                    Выбирайте ингредиенты и составьте себе бургер
                </p>
            }
        </section>
    );
});

export default BurgerConstructor;
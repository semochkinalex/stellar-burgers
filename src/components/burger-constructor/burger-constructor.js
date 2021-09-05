import { useDrop } from "react-dnd";
import {memo, useCallback, useMemo} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './burger-constructor.module.css';
import BurgerCheck from '../burger-check/burger-check';
import ConstructorItem from '../constructor-item/constructor-item';
import { CHANGE_BURGER_BUN, ADD_BURGER_INDREDIENT } from '../../services/actions/constructor';

const BurgerConstructor = memo(() => {
    const dispatch = useDispatch();

    const bun = useSelector(store => store.burger.bun);
    const ingredients = useSelector(store => store.burger.ingredients);

    const [, constructorTarget] = useDrop({
        accept: ["bun", "sauce", "main"],
        drop({ingredient}) {
            addIngredient(ingredient);
        }
    });

    const [, dropTarget] = useDrop({
        accept: "constructor",
        drop({ingredient}) {
            addIngredient(ingredient);
        }
    });

    const addIngredient = useCallback((ingredient) => {
        dispatch({
            type: ingredient.type === 'bun' ? CHANGE_BURGER_BUN : ADD_BURGER_INDREDIENT,
            ingredient: ingredient,
        })
    }, [dispatch]);

    return (
        <section className={styles.constructor} ref={constructorTarget}>
            { Object.keys(bun).length || ingredients.length ? 
                <>
                <ul className={styles.list}>
                    {Object.keys(bun).length ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="top" card={{...bun, isLocked: true}} /> : ''}
                    <div className={styles.content}>
                            {ingredients.map((card, index) => {     
                                return <ConstructorItem card={card} key={index} />
                            })}
                    </div>
                    {Object.keys(bun).length ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="bottom" card={{...bun, isLocked: true}} /> : ''}
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
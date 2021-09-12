import { useDrop } from "react-dnd";
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './burger-constructor.module.css';
import BurgerCheck from '../burger-check/burger-check';
import ConstructorItem from '../constructor-item/constructor-item';
import { CHANGE_BURGER_BUN, ADD_BURGER_INDREDIENT } from '../../services/actions/constructor';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const bun = useSelector(store => store.burger.bun);
    const ingredients = useSelector(store => store.burger.ingredients);

    const [, constructorTarget] = useDrop({
        accept: ["bun", "sauce", "main"],
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
                    {Object.keys(bun).length ? <ConstructorItem style={{margin: "0 15px 15px 0"}} type="top" card={{...bun, isLocked: true, name: bun.name + " (верх)"}} /> : ''}
                    <div className={styles.content}>
                            {ingredients.map((ingredient, index) => {     
                                return <ConstructorItem card={ingredient} key={ingredient.index} index={index}/>
                            })}
                    </div>
                    {Object.keys(bun).length ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="bottom" card={{...bun, isLocked: true, name: bun.name + " (низ)"}} /> : ''}
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
};

export default BurgerConstructor;
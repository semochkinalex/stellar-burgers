import { useDrop } from "react-dnd";
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './burger-constructor.module.css';
import OrderSubmit from '../order-submit/order-submit';
import ConstructorItem from '../constructor-item/constructor-item';
import { addIngredient } from '../../services/actions/constructor';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const bun = useSelector(store => store.burger.bun);
    const ingredients = useSelector(store => store.burger.ingredients);

    const isBunValid = useMemo(() => Object.keys(bun).length, [bun]);

    const [, constructorTarget] = useDrop({
        accept: ["bun", "sauce", "main"],
        drop({ingredient}) {
            dispatch(addIngredient(ingredient));
        }
    });

    return (
        <section className={styles.constructor} ref={constructorTarget}>
            { isBunValid || ingredients.length ? 
                <>
                <ul className={styles.list}>

                    {isBunValid ? <ConstructorItem style={{margin: "0 15px 15px 0"}} type="top" card={{...bun, isLocked: true, name: bun.name + " (верх)"}} /> : ''}

                    <div className={styles.content}>
                            {ingredients.map((ingredient, index) => {     
                                return <ConstructorItem card={ingredient} key={ingredient.index} index={index}/>
                            })}
                    </div>

                    {isBunValid ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="bottom" card={{...bun, isLocked: true, name: bun.name + " (низ)"}} /> : ''}

                </ul>
                <OrderSubmit />
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
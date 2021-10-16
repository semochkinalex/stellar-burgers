import { useDrop } from "react-dnd";
import { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import OrderSubmit from '../order-submit/order-submit';
import { useSelector, useDispatch } from '../../services/hooks';
import ConstructorItem from '../constructor-item/constructor-item';
import { addIngredient } from '../../services/actions/constructor';
import { TIngredient } from "../../services/types/data";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const bun = useSelector(store => store.burger.bun);
    const ingredients = useSelector(store => store.burger.ingredients);

    const isBunValid = useMemo(() => Boolean(bun), [bun]);

    const [, constructorTarget] = useDrop({
        accept: ["bun", "sauce", "main"],
        drop(item: {ingredient: TIngredient}) {
            dispatch(addIngredient(item.ingredient));
        }
    });

    return (
        <section className={styles.maker} ref={constructorTarget}>
            { isBunValid || ingredients.length ? 
                <>
                <ul className={styles.list}>

                    {isBunValid ? <ConstructorItem index={-2} style={{margin: "0 15px 15px 0"}} type="top" card={{...bun, isLocked: true, name: bun.name + " (верх)"}} /> : ''}

                    <div className={styles.content}>
                            {ingredients.map((ingredient: TIngredient, index: number) => {     
                                return <ConstructorItem card={ingredient} key={ingredient.index} index={index}/>
                            })}
                    </div>

                    {isBunValid ? <ConstructorItem index={-1} style={{padding: "0 16px 0 0"}} type="bottom" card={{...bun, isLocked: true, name: bun.name + " (низ)"}} /> : ''}

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
import PropTypes from 'prop-types';
import {memo, useContext, useMemo} from 'react';
import styles from './burger-constructor.module.css';
import BurgerCheck from '../burger-check/burger-check';
import ConstructorItem from '../constructor-item/constructor-item';
import ConstructorContext from '../../contexts/constructor-context';

const BurgerConstructor = memo(({order}) => {
    const {constructorState : {bun, ingredients}} = useContext(ConstructorContext);
    const isBunValid = useMemo(() => Boolean(Object.keys(bun).length), [bun]);
    const sum = useMemo(() => (ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0) + (Object.keys(bun).length ? bun.price*2 : 0)), [bun, ingredients]);

    const handleOrder = () => {
        const array = ingredients.concat([bun, bun]);
        order(array.map((food) => food._id));
    }

    return (
        <section className={styles.constructor}>
            {isBunValid || ingredients.length ? (
            <>
            <ul className={styles.list}>
                {isBunValid ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="top" card={bun} /> : ''}
                <div className={styles.content}>
                    {ingredients.map((card, index) => {     
                        return <ConstructorItem card={card} key={index} />
                    })}
                </div>
                {isBunValid ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="bottom" card={bun} /> : ''}
            </ul>
            <BurgerCheck sum={sum} handleOrder={handleOrder} isValid={isBunValid} />
            </>)
            : 
            <p className={`text text_type_main-large ${styles.none}`}>
                Выбирайте ингредиенты и составьте себе бургер
            </p>
            }
        </section>
    );
});

BurgerConstructor.propTypes = {
    order: PropTypes.func.isRequired,
}

export default BurgerConstructor;
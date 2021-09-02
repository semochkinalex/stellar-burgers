import PropTypes from 'prop-types';
import {memo, useContext, useMemo} from 'react';
import styles from './burger-constructor.module.css';
import ConstructorItem from '../constructor-item/constructor-item';
import ConstructorContext from '../../contexts/constructor-context';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = memo(({order, deleteIngredient}) => {
    const {constructorState : {bun, ingredients}, constructorDispatch} = useContext(ConstructorContext);
    const sum = useMemo(() => (ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0) + (Object.keys(bun).length ? bun.price*2 : 0)), [bun, ingredients]);

    const handleOrder = () => {
        const array = ingredients.concat([bun, bun]);
        order(array.map((food) => food._id));
    }

    return (
        <section className={styles.constructor}>
            {Object.keys(bun).length || ingredients.length ? (
            <>
            <ul className={styles.list}>
                {Object.keys(bun).length ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="top" card={bun} /> : ''}
                <div className={styles.content}>
                    {ingredients.map((card, index) => {     
                        return <ConstructorItem card={card} key={index} onDelete={deleteIngredient} />
                    })}
                </div>
                {Object.keys(bun).length ? <ConstructorItem style={{padding: "0 16px 0 0"}} type="bottom" card={bun} /> : ''}
            </ul>
            <div className={styles.check}>
            <p className="text text_type_main-large">
                {sum}    
            </p>
            <div className="m-1"></div>
            <CurrencyIcon type="primary" />
            <div className="m-3"></div>
            <Button type="primary" size="large" onClick={handleOrder}>
                Оформить заказ
            </Button>
            </div>
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
    deleteIngredient: PropTypes.func.isRequired,
}

export default BurgerConstructor;
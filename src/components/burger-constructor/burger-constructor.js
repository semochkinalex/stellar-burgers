import {memo} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {IngredientPropTypes} from '../../utils/prop-types.js';
import ConstructorItem from '../constructor-item/constructor-item';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = memo(({buns, ingredients, handleOrder}) => {
    const sum = ingredients.reduce((acc, el) => acc + el.price, 0) + (buns.price * 2);
    return (
        <section className={styles.constructor}>
            <ul className={styles.list}>
                <ConstructorItem style={{padding: "0 16px 0 0"}} type="top" card={buns} />
                <div className={styles.content}>
                    {ingredients.map((card, index) => {
                        return <ConstructorItem card={card} key={index} />
                    })}
                </div>
                <ConstructorItem style={{padding: "0 16px 0 0"}} type="bottom" card={buns} />
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
        </section>
    );
});

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientPropTypes).isRequired,
    buns: IngredientPropTypes.isRequired,
}

export default BurgerConstructor;
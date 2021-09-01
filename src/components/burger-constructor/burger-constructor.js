import PropTypes from 'prop-types';
import {memo, useContext, useMemo} from 'react';
import styles from './burger-constructor.module.css';
import ConstructorItem from '../constructor-item/constructor-item';
import ConstructorContext from '../../contexts/constructor-context';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = memo(({order}) => {
    const {constructorState : {bun, ingredients}, constructorDispatch} = useContext(ConstructorContext);

    const sum = useMemo(() => ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0) + (bun.price * 2), [bun, ingredients]);

    const handleOrder = () => {
        const array = ingredients.concat([bun, bun]);
        order(array.map((food) => food._id));
    }

    return (
        <section className={styles.constructor}>
            <ul className={styles.list}>
                <ConstructorItem style={{padding: "0 16px 0 0"}} type="top" card={bun} />
                <div className={styles.content}>
                    {ingredients.map((card, index) => {     
                        return <ConstructorItem card={card} key={index} />
                    })}
                </div>
                <ConstructorItem style={{padding: "0 16px 0 0"}} type="bottom" card={bun} />
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
    order: PropTypes.func.isRequired,
}

export default BurgerConstructor;
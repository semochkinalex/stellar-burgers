import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {FoodPropTypes} from '../../utils/prop-types.js';
import ConstructorItem from '../constructor-item/constructor-item';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({data}) => {
    const sum = data.reduce((acc, el) => acc + el.price, 0);
    const first = data.length !== 0 ? data[0] : null;
    const last = data.length !== 0 ? (data.length !== 1 ? data[data.length - 1] : null)  : null;   
    
    return (
        <section className={styles.constructor}>
            <ul className={styles.list}>
                <ConstructorItem style={{padding: "0 16px 0 0"}} type="top" card={first} />
                <div className={styles.content}>
                    {data.map((card, index) => {
                        if (index === 0 || index === data.length - 1) return;
                        return <ConstructorItem card={card} key={index} />
                    })}
                </div>
                {/* Css first-of-type и last-of-type на все элементы с родительском блоком работают */}
                <ConstructorItem style={{padding: "0 16px 0 0"}} type="bottom" card={last} />
            </ul>
            <div className={styles.check}>
                <p className="text text_type_main-large">
                    {sum}    
                </p>
                <div className="m-1"></div>
                <CurrencyIcon type="primary" />
                <div className="m-3"></div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(FoodPropTypes),
}

export default BurgerConstructor;
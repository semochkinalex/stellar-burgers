import styles from './burger-constructor.module.css';
import {Button, DragIcon, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({data}) => {
    const sum = data.reduce((acc, el) => acc + el.price, 0);
    return (
    <section className={styles.constructor}>
        <ul className={styles.list}>
            {data.map(({thumbnail, price, text, type = '', isLocked = false}, i) => {
            return (
            <li className={styles.element} key={i}>
                {!isLocked ? <DragIcon type="primary" /> : ''}
                <div className="m-2"></div>
                <ConstructorElement
                   type={type}
                   isLocked={isLocked}
                   text={text}
                   price={price}
                   thumbnail={thumbnail}
                 />
            </li>)
            })
            }
        </ul>
        <div className={styles.check}>
            <p className="text text_type_main-large">
                {sum}
            </p>
            <div className="m-1"></div>
            <CurrencyIcon type="primary" />
            <div className="m-4"></div>
            <Button type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    </section>
    );
};

export default BurgerConstructor;
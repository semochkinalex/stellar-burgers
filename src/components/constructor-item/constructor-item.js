import PropTypes from 'prop-types';
import styles from './constructor-item.module.css';
import { IngredientPropTypes } from '../../utils/prop-types';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorItem = ({card, onDelete, type = undefined, style}) => {
    const {isLocked = false, name, price, image} = card;

    const handleDelete = () => {
    }

    return (
        <>
            <li className={styles.card} style={style}>
                    {  !isLocked &&
                    <>
                        <DragIcon type="primary" />
                        <div className="m-1"></div>
                    </>}
                    <ConstructorElement type={type} isLocked={isLocked} text={name} price={price} thumbnail={image} /> {/* Создать свой констрактор елемент для мобилок */}
            </li>
        </>
    );
}

ConstructorItem.propTypes = {
    card: IngredientPropTypes.isRequired,
    type: PropTypes.string,
    style: PropTypes.object,
    onDelete: PropTypes.func,
};

export default ConstructorItem;
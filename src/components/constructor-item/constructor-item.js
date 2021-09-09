import useRef, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import styles from './constructor-item.module.css';
import { useDispatch } from 'react-redux';
import { IngredientPropTypes } from '../../utils/prop-types';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { UPDATE_BURGER_ORDER, REMOVE_BURGER_INGREDIENT } from '../../services/actions/constructor';

const ConstructorItem = ({card: ingredient, type = undefined, style}) => {
    const dispatch = useDispatch();
    const {isLocked = false, name, price, image, index, _id} = ingredient;

    const [, dropTarget] = useDrop({
        accept: "constructor",
        drop({ingredient}, monitor) {
            return handleSwitch(ingredient, monitor);
        }
    });

    const [, dragRef] = useDrag({
        type: "constructor",
        item: {ingredient},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const handleSwitch = (ingredient) => {
        if(ingredient.index === index) return;
        dispatch({
            type: UPDATE_BURGER_ORDER,
            fromIndex: index,
            toIndex: ingredient.index
        })
    }

    const handleRemoveElement = () => {
        dispatch({
            type: REMOVE_BURGER_INGREDIENT,
            id: _id,
        })
    }

    return (
            <li ref={dropTarget}> {/* wrapper */ }
                <div className={styles.card} style={style} draggable={!isLocked} ref={!isLocked ? dragRef : null}>
                    {  !isLocked &&
                    <>
                        <DragIcon type="primary" />
                        <div className="m-1"></div>
                    </>}
                    <ConstructorElement handleClose={handleRemoveElement} type={type} isLocked={isLocked} text={name} price={price} thumbnail={image} /> {/* Создать свой констрактор елемент для мобилок */}
                </div>
            </li>
    );
}

ConstructorItem.propTypes = {
    card: IngredientPropTypes.isRequired,
    type: PropTypes.string,
    style: PropTypes.object,
};

export default ConstructorItem;
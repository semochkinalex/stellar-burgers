import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import styles from './constructor-item.module.css';
import { useDispatch } from 'react-redux';
import { IngredientPropTypes } from '../../utils/prop-types';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_BURGER_INGREDIENT, SWAP_INGREDIENTS } from '../../services/actions/constructor';
import { IndentStyle } from 'typescript';

const ConstructorItem = ({card: ingredient, type = undefined, style}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const {isLocked = false, name, price, image, index} = ingredient;

    const [, drop] = useDrop({
        accept: "constructor",
        hover(item, monitor) {
            if (!ref.current) return;
            const [dragIndex, hoverIndex] = [item.index, index];
            if (dragIndex === hoverIndex) return;
            if (hoverIndex != 0 && !hoverIndex) return;
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            dispatch({
                type: SWAP_INGREDIENTS,
                from: dragIndex,
                to: hoverIndex,
            })
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, drag] = useDrag({
        type: "constructor",
        item: {index: ingredient.index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const handleRemoveElement = () => {
        dispatch({
            type: REMOVE_BURGER_INGREDIENT,
            id: index,
        })
    }

    drag(drop(ref));
    if (!ingredient) return;

    return (
            <li ref={!isLocked ? ref : null} className={styles.card} style={{...style, opacity: isDragging ? 0 : 1}} draggable={!isLocked}> {/* wrapper */ }
                    {  !isLocked &&
                    <>
                        <DragIcon type="primary" />
                        <div className="m-1"></div>
                    </>}
                    <ConstructorElement handleClose={handleRemoveElement} type={type} isLocked={isLocked} text={name} price={price} thumbnail={image} /> {/* Создать свой констрактор елемент для мобилок */}
            </li>
    );
}

ConstructorItem.propTypes = {
    card: IngredientPropTypes.isRequired,
    type: PropTypes.string,
    style: PropTypes.object,
};

export default ConstructorItem;
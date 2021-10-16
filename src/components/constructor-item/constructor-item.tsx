import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './constructor-item.module.css';
import { useDispatch } from 'react-redux';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient, swapIngredients } from '../../services/actions/constructor';
import { TIngredient } from '../../services/types/data';

interface IConstructorItem {
    card: TIngredient;
    index: number;
    type?: "top" | "bottom" | undefined;
    style?: React.CSSProperties;
}

const ConstructorItem: React.FC<IConstructorItem> = ({card: ingredient, type = undefined, index, style}) => {
    const id = ingredient._id;
    const ref = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();
    const {isLocked = false, name, price, image} = ingredient;

    const handleRemoveElement = () => {
        dispatch(removeIngredient(index));
    }

    const [, drop] = useDrop({
        accept: "constructor",
        hover(item: TIngredient, monitor) {
            const [dragIndex = 0, hoverIndex = 0] = [item.index, index];
            if (dragIndex === hoverIndex) return;
            // Все проверки в переменных для typescript
            const hoverBoundingRect = (ref && ref.current?.getBoundingClientRect());
            const hoverMiddleY = (hoverBoundingRect && (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2);
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset && hoverBoundingRect && clientOffset.y - hoverBoundingRect.top);
            if (hoverClientY && hoverMiddleY && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (hoverClientY && hoverMiddleY && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
            dispatch(swapIngredients(dragIndex, hoverIndex));
            item.index = hoverIndex;
        }
    });

    const [{isDragging}, drag] = useDrag({
        type: "constructor",
        item: {id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

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

export default ConstructorItem;
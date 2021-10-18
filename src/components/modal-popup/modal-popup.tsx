import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './modal-popup.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/hooks';

interface IModalPopup {
    link?: string;
    actionType: string | null;
}

const ModalPopup: React.FC<IModalPopup> = ({actionType, link = '', children}) => {
    const history = useHistory();
    const dispatch = useDispatch(); 
    useEffect(() => {
        document.addEventListener('keydown', closeByKey);
        return () => {document.removeEventListener('keydown', closeByKey)};
    }, [children])

    const closeByKey = (evt: KeyboardEvent) => {
        if (evt.code === "Escape") return onClose();
    }

    const onClose = () => {
        if (actionType) return dispatch({type: actionType});
        history.replace({pathname: `/${link}`});
    }

    return (
            <ModalOverlay onClose={onClose}>
                <div className={styles.body} onClick={(e) => {e.stopPropagation()}}>
                        <button className={styles.button} onClick={onClose}>
                            <CloseIcon type="primary" />
                        </button>
                        {children}
                </div>
            </ModalOverlay>
    );
};

export default ModalPopup;
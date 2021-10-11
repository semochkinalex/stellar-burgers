import PropTypes from 'prop-types';
import {memo, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './modal-popup.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

const ModalPopup = memo(({actionType, link = '', children}) => {
    const history = useHistory();
    const dispatch = useDispatch(); 
    useEffect(() => {
        document.addEventListener('keydown', closeByKey);
        return () => {document.removeEventListener('keydown', closeByKey)};
    }, [children])

    const closeByKey = ({code}) => {
        if (code === "Escape") return onClose();
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
})

ModalPopup.propTypes = {
    actionType: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default ModalPopup;
import PropTypes from 'prop-types';
import {memo, useEffect} from 'react';
import styles from './modal-popup.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const ModalPopup = memo(({togglePopup, children}) => {   
    useEffect(() => {
        document.addEventListener('keydown', closeByKey);
        return () => {document.removeEventListener('keydown', closeByKey)};
    }, [children])

    const closeByKey = ({code}) => {
        if (code === "Escape") return onClose();
    }

    const onClose = (e) => {
        togglePopup();
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
            /* <section className={styles.popup + ' ' + `${isOpen && styles.open}`} onClick={onClose}>
            </section> */
    );
})

ModalPopup.propTypes = {
    togglePopup: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default ModalPopup;
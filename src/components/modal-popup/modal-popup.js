import {memo, useEffect} from 'react';
import styles from './modal-popup.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const ModalPopup = memo(({isOpen, togglePopup, children}) => {    

    useEffect(() => {
        document.addEventListener('keydown', closeByKey);
        return () => {document.removeEventListener('keydown', closeByKey)};
    }, [])

    const closeByKey = ({code}) => {
        if (code === "Escape") return onClose();
    }

    const onClose = (e) => {
        togglePopup();
    }

    return (
        <>
            <section className={styles.popup + ' ' + `${isOpen && styles.open}`} onClick={onClose}>
                <div className={styles.body} onClick={(e) => {e.stopPropagation()}}>
                    <button className={styles.button} onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </div>
            </section>
        </>
    );
})

export default ModalPopup;
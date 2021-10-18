import { createPortal } from 'react-dom';
import styles from './modal-overlay.module.css';
import React from 'react';

const modalSection: any = document.getElementById('modals');

interface IModalOverlay{
    onClose: () => void;
}

class ModalOverlay extends React.PureComponent<IModalOverlay> {
    render () {
        return createPortal(
            <section className={styles.popup} onClick={this.props.onClose}>
                {this.props.children}
            </section>,
            modalSection
        )
    }
}

export default ModalOverlay;
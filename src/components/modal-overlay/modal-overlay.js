import { createPortal } from 'react-dom';
import styles from './modal-overlay.module.css';
import React from 'react';

const modalSection = document.getElementById('modals');

class ModalOverlay extends React.PureComponent {
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
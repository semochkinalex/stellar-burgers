import { createPortal } from 'react-dom';
import styles from './modal-overlay.module.css';
import React from 'react';

const root = document.getElementById('root');

class ModalOverlay extends React.PureComponent {
    render () {
        return createPortal(
            <section className={styles.popup} onClick={this.props.onClose}>
                {this.props.children}
            </section>,
            root
        )
    }
}

export default ModalOverlay;
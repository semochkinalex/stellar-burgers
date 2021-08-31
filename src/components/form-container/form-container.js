import PropTypes from 'prop-types';
import styles from './form-container.module.css';

const FormContainer = ({children}) => {
    return (
        <section className={styles.container}>
            {children}
        </section>
    );
}

FormContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FormContainer;
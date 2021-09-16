import PropTypes from 'prop-types';
import styles from './user-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const UserForm = ({title, submitText, children, isValid, onSubmit}) => {
    return (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
            <h2 className="text text_type_main-medium">
              {title}
            </h2>
            {children}
            <Button type="primary" size="medium" disabled={!isValid}>
                {submitText}
            </Button>
            <div className="m-2"></div>
        </form>
    );
}

UserForm.propTypes = {
    title: PropTypes.string.isRequired,
    submitText: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isValid: PropTypes.bool.isRequired,
}

export default UserForm;
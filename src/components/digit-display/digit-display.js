import PropTypes from 'prop-types'
import styles from './digit-display.module.css';

const DigitDisplay = ({number, title}) => {
    return (
        <div className={styles.container}>
            <p className={`text text_type_main-default`}>{title}</p>
            <p className={`text text_type_digits-large ${styles.shadow}`}>{number}</p>
        </div>
    );
}

DigitDisplay.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
}

export default DigitDisplay;
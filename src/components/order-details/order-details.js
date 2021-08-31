// import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import orderConfirmedIcon from '../../images/orderConfirmed.svg';

const OrderDetails = () => {
    return (
        <>
            <p className={`text text_type_digits-large ${styles.id}`}>034536</p>
            <p className={`text text_type_main-medium ${styles.identification}`}>
                идентификатор заказа
            </p>
            <img className={styles.image} src={orderConfirmedIcon} alt="Order Confirmed" />
            <p className={`text text_type_main-default ${styles.text}`}>
                Ваш заказ начали готовить
            </p>
            <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );
}

export default OrderDetails;
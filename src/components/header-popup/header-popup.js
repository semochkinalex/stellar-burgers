import styles from './header-popup.module.css';
import closeIcon from '../../images/closeIcon.svg';
import burgerIcon from '../../images/burgerIcon.svg';
import listIcon from '../../images/listIcon.svg';

import { ArrowDownIcon, ArrowUpIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_HEADER_POPUP } from '../../services/constants/index';

// НЕ ИСПОЛЬЗУЕТСЯ
const HeaderPopup = () => {
    const dispatch = useDispatch();
    const isShown = useSelector(store => store.config.headerPopupOpen);
    const [profileShown, setProfileShown] = useState(false);
    const toggleProfile = () => setProfileShown(!profileShown);

    const togglePopup = () => dispatch({type: CLOSE_HEADER_POPUP});


    return (
        <nav className={styles.navigation + (isShown ? ' ' + styles.shown : '')}>
            <div className={styles.top}>
                <p className="text text_type_main-large">
                    Меню
                </p>
                <img className={styles.close} src={closeIcon} alt="Close button" onClick={togglePopup} />
            </div>
            <ul className={styles.list}>
                <li className={styles.element}>
                    {!profileShown ? <ArrowDownIcon type="primary" onClick={toggleProfile} /> : <ArrowUpIcon type="primary" onClick={toggleProfile} />}
                </li>
                {
                    profileShown &&
                    <>
                        <ul className={styles.profile}>
                            <li className={styles.profileTab}>
                                <p className="text text_type_main-default">      
                                    Профиль
                                </p>
                            </li>
                            <li className={styles.profileTab}>
                                <p className="text text_type_main-default">      
                                    История заказов
                                </p>
                            </li>
                            <li className={styles.profileTab}>
                                <p className="text text_type_main-default">      
                                    Выход
                                </p>
                            </li>
                        </ul>
                    </>
                }
                <li className={styles.element}>
                    <img className={styles.icon} src={burgerIcon} alt="Constructor" />
                        <p className="text text_type_main-medium">
                            Конструктор
                        </p>
                </li>
                <li className={styles.element}>
                    <img className={styles.icon} src={listIcon} alt="Orders" />
                    <p className="text text_type_main-medium">
                      Лента заказов
                    </p>
                </li>
            </ul>
        </nav>
    );
}

export default HeaderPopup;
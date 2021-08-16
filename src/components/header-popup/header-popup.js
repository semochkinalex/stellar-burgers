import PropTypes from 'prop-types';
import styles from './header-popup.module.css';
import closeIcon from '../../images/closeIcon.svg';
import AppHeaderProfile from '../app-header-profile/app-header-profile.js';
import burgerIcon from '../../images/burgerIcon.svg';
import listIcon from '../../images/listIcon.svg';

import { ArrowDownIcon, ArrowUpIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';


const HeaderPopup = ({isShown, togglePopup}) => {
    // В будущем для адаптивной вёрстки, сейчас тут плохой код:(
    const [profileShown, setProfileShown] = useState(false);

    const toggleProfile = () => {
        setProfileShown(!profileShown);
    }

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
                    <AppHeaderProfile style={{
                       display: 'flex'
                    }} text="medium" />   
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

HeaderPopup.propTypes = {
    isShown: PropTypes.bool.isRequired,
    togglePopup: PropTypes.func.isRequired,
}


export default HeaderPopup;
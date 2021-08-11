import React from 'react';
import styles from './AppHeaderProfile.module.css';

import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeaderProfile extends React.Component {
    render () {
        return (
            <div className={styles.profile}>
                <ProfileIcon type="primary" />
                <div className="m-1"></div>
                <p className={`${styles.text} text text_type_main-default`}>
                    Личный кабинет
                </p>
            </div>
        );
    }
}

export default AppHeaderProfile;
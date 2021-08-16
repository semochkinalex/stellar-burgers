import React from 'react';
import styles from './AppHeaderProfile.module.css';
import profileIcon from '../../images/profileIcon.svg';

// import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeaderProfile extends React.Component {
    render () {
        return (
            <div className={styles.container} style={this.props.style}>
                <img className={styles.icon} src={profileIcon} alt="profileIcon" />
                <div className="m-1"></div>
                <p className={`${styles.text} text text_type_main-${this.props.text}`}>
                    Личный кабинет
                </p>
            </div>
        );
    }
}

export default AppHeaderProfile;
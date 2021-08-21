import React from 'react';
import PropTypes from 'prop-types';
import styles from './app-header-profile.module.css';
import profileIcon from '../../images/profileIcon.svg';

const AppHeaderProfile = React.memo((props) => 
            (<div className={styles.container} style={props.style}>
                <img className={styles.icon} src={profileIcon} alt="profileIcon" />
                <div className="m-1"></div>
                <p className={`${styles.text} text text_type_main-${props.text}`}>
                    Личный кабинет
                </p>
            </div>
));

AppHeaderProfile.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
}

export default AppHeaderProfile;
import React from 'react';
import PropTypes from 'prop-types';
import {Link, useRouteMatch} from 'react-router-dom';
import styles from './app-header-profile.module.css';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeaderProfile = React.memo((props) => {
    const match = useRouteMatch("/profile")
    return (
                <div className={styles.container} style={props.style}>
                    <ProfileIcon type={match ? 'primary' : 'secondary'} />
                    <div className="m-1"></div>
                    <Link to="/profile" className={`${styles.text} ${match ? styles.active : 'text_color_inactive'} text text_type_main-${props.text}`}>
                        Личный кабинет
                    </Link>
                </div>
            )
    }
);

AppHeaderProfile.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
}

export default AppHeaderProfile;
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from './header-link.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeaderItem = React.memo(({to, icon, children}) => {
    const match = useRouteMatch(to);
    const imageClass = useMemo(() => match?.isExact ? "primary" : "secondary", [match]);
    const IconComponent = (icon == 'burger') ? <BurgerIcon type={imageClass} /> : (icon == 'list' ? <ListIcon type={imageClass} /> : <ProfileIcon type={imageClass} />);
    return (
        <NavLink className={styles.link} to={to}>
            {IconComponent}
            <div className="m-1"></div>
            <p className={`text text_type_main-default text_color_inactive ${match?.isExact && styles.active}`}>
                {children}
            </p>
        </NavLink>
        // <li className={styles.item}>
        //     {props.icon}
        //     <div className="m-1"></div>
        //     {/* <p className={`text text_type_main-default`}> */}
        //     <NavLink exact to={props.to} className={`${styles.link} text text text_type_main-default text_color_inactive`} activeClassName={styles.activeLink}>{props.children}</NavLink>
        //     {/* </p> */}
        // </li>
    );
});

AppHeaderItem.propTypes = {
    icon: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
}

export default AppHeaderItem;
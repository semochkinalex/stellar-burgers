import React from 'react';
import PropTypes from 'prop-types';
import headerStyles from './app-header-item.module.css';

const AppHeaderItem = React.memo((props) => {
    return (
        <li className={headerStyles.item}>
            {props.icon} {/* Icon */}
            <div className="m-1"></div>
            <p className={`text text_type_main-default`}>
                {props.children}
            </p>
        </li>
    );
});

AppHeaderItem.propTypes = {
    icon: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
}

export default AppHeaderItem;
import React from 'react';
import headerStyles from './app-header-item.module.css';

class AppHeaderItem extends React.Component {
    render () {
    return (
        <ul className={headerStyles.item}>
            {this.props.icon} {/* Icon */}
            <div className="m-1"></div>
            <p className={`text text_type_main-default`}>
                {this.props.children}
            </p>
        </ul>
    )};
}

export default AppHeaderItem;
import React from 'react';
import headerStyles from './AppHeaderItem.module.css';

class AppHeaderItem extends React.Component {
    render () {
    return (
        <ul className={headerStyles.item}>
            {this.props.icon} {/* Icon */}
            <div className="m-2"></div>
            <p className={`text text_type_main-default`}>
                {this.props.children}
            </p>
        </ul>
    )};
}

export default AppHeaderItem;
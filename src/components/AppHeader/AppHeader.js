import React from 'react';
import headerStyles from './AppHeader.module.css';
import AppHeaderItem from '../AppHeaderItem/AppHeaderItem.js';
import AppHeaderProfile from '../AppHeaderProfile/AppHeaderProfile.js';

import { Logo, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component{
    render () {
        return (
        <header className={headerStyles.header}>
            <ul className={headerStyles.list}>
                    <AppHeaderItem icon={<BurgerIcon type="primary" />}>
                        Конструктор
                    </AppHeaderItem>
                    <div className="m-2"></div>
                    <AppHeaderItem icon={<ListIcon type="primary" />}>
                        Лента заказов
                   </AppHeaderItem>
            </ul>
            <Logo />
            <AppHeaderProfile />
        </header>
    )};
}

export default AppHeader;
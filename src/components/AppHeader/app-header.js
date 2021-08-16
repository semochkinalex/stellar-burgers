import React, { useEffect, useState } from 'react';
import menuIcon from '../../images/menuIcon.svg';
import headerStyles from './app-header.module.css';
import mobileLogo from '../../images/mobileLogo.svg';
import useWindowSize from '../../utils/useWindowSize';
import AppHeaderItem from '../AppHeaderItem/AppHeaderItem.js';
import AppHeaderProfile from '../AppHeaderProfile/AppHeaderProfile.js';

import { Logo, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = ({togglePopup}) => {

    const {width, height} = useWindowSize();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(width <= 1300);
    }, [width]);
    
    return (
    <header className={headerStyles.header}>
        {
            !isMobile ?
                <nav className={headerStyles.content}>
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
                    <AppHeaderProfile style={{
                        width: '100%',
                        justifyContent: 'flex-end',
                        height: '100%', 
                    }} text="default" />
                </nav>  
                :
                <>
                    <img alt="logo" src={mobileLogo} />
                    <img alt="menu" src={menuIcon} className={headerStyles.menu} onClick={togglePopup} />
                </>
        }
    </header>
    );
}

export default AppHeader;
import React from 'react';
import { Link } from 'react-router-dom';
import headerStyles from './app-header.module.css';
import HeaderLink from '../header-link/header-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
    return (
    <header className={headerStyles.header}>
        <nav className={headerStyles.content}>
            <ul className={headerStyles.list}>
                <HeaderLink to="/" icon={"burger"}>
                    Конструктор
                </HeaderLink>
                <HeaderLink to="/feed" icon={"list"}>
                    Лента заказов
                </HeaderLink>
            </ul>

            <Link to="/"><Logo /></Link>

            <div className={headerStyles.wrapper}>
                <HeaderLink to="/profile/edit" icon={"profile"}>
                    Личный профиль
                </HeaderLink>
            </div>

        </nav>  
    </header>
    );
}

export default AppHeader;

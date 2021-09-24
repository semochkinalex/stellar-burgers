// import menuIcon from '../../images/menuIcon.svg';
// import mobileLogo from '../../images/mobileLogo.svg';
import headerStyles from './app-header.module.css';
import HeaderLink from '../header-link/header-link.js';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
// import { useDispatch, useSelector } from 'react-redux';

const AppHeader = () => {
    // const dispatch = useDispatch();

    // const isMobileHeader = useSelector(store => store.config.isMobileHeader);
    // const togglePopup = () =>  dispatch({type: OPEN_HEADER_POPUP})
    
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

            <Logo />

            <div className={headerStyles.wrapper}>
                <HeaderLink to="/profile/edit" icon={"profile"}>
                    Лента заказов
                </HeaderLink>
            </div>

        </nav>  
    </header>
    );
}

export default AppHeader;

// {
//     !isMobileHeader ?
//         <nav className={headerStyles.content}>
//             <ul className={headerStyles.list}>
//                     <AppHeaderItem icon={<BurgerIcon type="primary" />} to="/">
//                         Конструктор
//                     </AppHeaderItem>
//                     <div className="m-2"></div>
//                     <AppHeaderItem icon={<ListIcon type="primary" />} to="/feed">
//                         Лента заказов
//                    </AppHeaderItem>
//             </ul>
//             <Logo />
//             <AppHeaderProfile style={{
//                 width: '100%',
//                 justifyContent: 'flex-end',
//                 height: '100%', 
//             }} text="default" />
//         </nav>  
//         :
//         <>
//             <img alt="logo" src={mobileLogo} />
//             <img alt="menu" src={menuIcon} className={headerStyles.menu} onClick={togglePopup} />
//         </>
// }
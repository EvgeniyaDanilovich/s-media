import React from 'react';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import styles from './Header.module.css';
import { THeaderProps } from '../../models/types-components';

export const Header: React.FC<THeaderProps> = ({userId, login, isAuth, logoutTC}) => {
   const  onLogout = () =>{
       logoutTC();
    }

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerRow}>
                    <nav data-testid="navbar" className={styles.navbar}>
                        <NavLink data-testid="main-link" to={`/main/${userId}`}
                                 className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                     : styles.link}>Main
                        </NavLink>
                        <NavLink
                            to="/messages"
                            className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                : styles.link}> Messages
                        </NavLink>
                        <NavLink
                            to="/users"
                            className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                : styles.link}> Users
                        </NavLink>
                        <NavLink
                            to="/chat"
                            className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                : styles.link}> Chat
                        </NavLink>
                    </nav>
                    <div className={styles.loginBlock}>
                        {isAuth ? <div><div>{login}</div><button onClick={logoutTC}>Log out</button></div>  :
                        <NavLink data-testid="main-link" to="/login"
                                 className={({ isActive }) => isActive ? `${styles.activeHeaderLink} ${styles.link}`
                                     : styles.link}> Login
                        </NavLink>}
                    </div>
                </div>
            </div>
        </header>
    );
};

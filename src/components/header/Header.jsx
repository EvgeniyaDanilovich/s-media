import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = ({userId, login, isAuth, logoutTC}) => {
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

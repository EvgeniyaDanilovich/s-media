import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import HeaderContainer  from '../header/HeaderContainer';

export const Layout = () => {
    return (
        <>
            <HeaderContainer />
            <main>
                <Outlet />
            </main>

            <footer></footer>
        </>
    );
};
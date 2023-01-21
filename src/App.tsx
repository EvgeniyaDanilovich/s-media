import { Route, Routes } from 'react-router-dom';

import React, { lazy, Suspense, useEffect } from 'react';
import './App.css';
import { Layout } from './components/layout/Layout';
import MainPageContainer from './components/mainPage/MainPageContainer';
import Login from './components/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './state/app-reducer';
import Preloader from './components/common/preloader/Preloader';
import { AppStateType } from './state/redux-store';

const MessagesPageContainer = lazy(() => import('./components/messages/MessagesPageContainer'));
const UsersPageContainer = lazy(() => import('./components/usersPage/UsersPageContainer'));

const App: React.FC = () => {
    const dispatch = useDispatch();
    const isInitialized = useSelector((state: AppStateType) => state.app.initialized);

    useEffect(() => {
        // @ts-ignore
        dispatch(initializeApp());
    });

    if (!isInitialized) return <Preloader />


    return (
        <div className="app">
            <Suspense fallback={<div><Preloader /></div>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* <Route index element={<MainPageContainer />} /> */}
                        <Route path="main/:userId" element={
                            // @ts-ignore
                            <MainPageContainer />} />
                        <Route path="messages/*" element={< MessagesPageContainer />} />
                        <Route path="users" element={<UsersPageContainer />} />
                        <Route path="login" element={<Login />} />
                    </Route>
                    <Route path="*" element={<div>Not found 404</div>} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

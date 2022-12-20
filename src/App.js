import { Navigate, Route, Routes } from 'react-router-dom';

import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import { Layout } from './components/layout/Layout';
// import MessagesPageContainer from './components/messages/MessagesPageContainer';
// import UsersPageContainer from './components/usersPage/UsersPageContainer';
import MainPageContainer from './components/mainPage/MainPageContainer';
import Login from './components/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './state/app-reducer';
import Preloader from './components/common/preloader/Preloader';

const MessagesPageContainer = lazy(() => import('./components/messages/MessagesPageContainer'));
const UsersPageContainer = lazy(() => import('./components/usersPage/UsersPageContainer'));

function App() {
    const dispatch = useDispatch();
    const isInitialized = useSelector((state) => state.app.initialized);

    useEffect(() => {
        dispatch(initializeApp());
    });

    if (!isInitialized) return <Preloader />;  // ?

    return (
        <div className="app">
            <Suspense fallback={<div><Preloader /></div>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* <Route index element={<MainPageContainer />} /> */}
                        <Route path="main/:userId" element={<MainPageContainer />} />
                        <Route path="messages/*" element={<MessagesPageContainer />} />
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

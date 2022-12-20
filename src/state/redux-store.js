import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { mainReducer } from './main-reducer';
import { messageReducer } from './message-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users-reducer';
import { authReducer } from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import { appReducer } from './app-reducer';

const reducers = combineReducers({
    mainPage: mainReducer,
    messagesPage: messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// const reducers = {
//     mainPage: mainReducer,
//     messagesPage: messageReducer,
//     usersPage: usersReducer
// }
// const store = configureStore(reducers);

export default store;

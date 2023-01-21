import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { mainReducer } from './main-reducer';
import { messageReducer } from './message-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users-reducer';
import { authReducer } from './auth-reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { appReducer } from './app-reducer';

type rootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<rootReducerType>;

// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
// export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

export type TBaseThunk<A extends Action, R = void> = ThunkAction<R, AppStateType, unknown, A>

const rootReducers = combineReducers({
    mainPage: mainReducer,
    messagesPage: messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(
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

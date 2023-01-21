import { appActions } from '../state/app-reducer';
import { authActions } from '../state/auth-reducer';
import { mainActions } from '../state/main-reducer';
import { messageActions } from '../state/message-reducer';
import { usersActions } from '../state/users-reducer';
import { InferActionsTypes, TBaseThunk } from '../state/redux-store';
import { TProfile, TUser } from './common-types';

export type AppInitState = {
    initialized: boolean
}

export type TAppActions = InferActionsTypes<typeof appActions>
export type TAppThunk = TBaseThunk<TAppActions>

export type AuthInitState = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    serverErrorMessage: string,
    captchaUrl: string | null
}

export type TAuthActions = InferActionsTypes<typeof authActions>
export type TAuthThunk = TBaseThunk<TAuthActions>

type MainInitStatePosts = {
    id: number,
    message: string
}

export type MainInitState = {
    posts: MainInitStatePosts[],
    profile: TProfile | null,
    status: string,
    newPostText: string
}

export type TMainActions = InferActionsTypes<typeof mainActions>
export type TMainThunk = TBaseThunk<TMainActions>

type MessageInitStateMessages = {
    id: number,
    message: string
}

export type MessageInitState = {
    messages: MessageInitStateMessages[],
}

export type TMessageActions = InferActionsTypes<typeof messageActions>
export type TMessageThunk = TBaseThunk<TMessageActions>

export type UsersInitState = {
    users: TUser[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[]
}

export type TUsersActions = InferActionsTypes<typeof usersActions>
export type TUsersThunk = TBaseThunk<TUsersActions>;
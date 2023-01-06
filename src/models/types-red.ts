import { INITIALIZED_SUCCESS } from '../state/app-reducer';
import { GET_CAPTCHA_URL_SUCCESS, SET_SERVER_ERROR_MESSAGE, SET_USER_DATA } from '../state/auth-reducer';
import { ADD_POST, SET_AVATAR_SUCCESS, SET_STATUS, SET_USER_PROFILE } from '../state/main-reducer';
import { ADD_MESSAGE } from '../state/message-reducer';
import { FOLLOW, SET_CURRENT_PAGE, SET_TOTAL_USERS_COUNT, SET_USERS, TOGGLE_IS_FETCHING, TOGGLE_IS_FOLLOWING_PROGRESS, UNFOLLOW } from '../state/users-reducer';

export type AppInitState = {
    initialized: boolean
}

export type InitializedSuccessAction = {
    type: typeof INITIALIZED_SUCCESS
}

export type AuthInitState = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    serverErrorMessage: string,
    captchaUrl: string | null
}

export type SetAuthUserDataAction = {
    type: typeof SET_USER_DATA,
    payload: {
        id: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    }
}

export type SetServerErrorMessageAction = {
    type: typeof SET_SERVER_ERROR_MESSAGE,
    message: string
}
export type GetCaptchaUrlSuccessAction = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: string
}

type MainInitStatePosts = {
    id: number,
    message: string
}

type MainInitStateProfileContacts = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type Photos = {
    small: string | null,
    large: string | null
}

export type MainInitStateProfile = {
    userId: number,
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: MainInitStateProfileContacts,
    photos: Photos
}

export type MainInitState = {
    posts: MainInitStatePosts[],
    profile: MainInitStateProfile | null,
    status: string
}

export type AddPostAction = {
    type: typeof ADD_POST,
    post: string
}
export type SetUserProfileAction = {
    type: typeof SET_USER_PROFILE,
    profile: MainInitStateProfile
}
export type SetStatusAction = {
    type: typeof SET_STATUS,
    status: string
}
export type SetAvatarSuccessAction = {
    type: typeof SET_AVATAR_SUCCESS,
    photos: Photos
}

type MessageInitStateMessages = {
    id: number,
    message: string
}

export type MessageInitState = {
    messages: MessageInitStateMessages[],
}

export type AddMessageAction = {
    type: typeof ADD_MESSAGE,
    message: string
}

export type User = {
    name: string,
    id: number,
    photos: Photos,
    status: string | null,
    followed: boolean
}

export type UsersInitState = {
    users: User[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[]
}

export type FollowAction = {
    type: typeof FOLLOW,
    userId: number
}

export type UnFollowAction = {
    type: typeof UNFOLLOW,
    userId: number
}

export type SetUsersAction = {
    type: typeof SET_USERS,
    users: User[]
}
export type SetCurrentPageAction = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export type SetTotalUsersCountAction = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
export type ToggleIsFetchingAction = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export type ToggleFollowingProgressAction = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}

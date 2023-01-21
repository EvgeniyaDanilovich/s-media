import { TMessage, TPost, TProfile, TUser } from './common-types';

export type PaginationProps = {
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    onPageChanged: (page: number) => void,
    portionSize?: number
}

export type UsersProps = {
    users: TUser[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
    followUserThunkCreator: (userId: number) => void,
    unFollowUserThunkCreator: (userId: number) => void,
    onPageChanged: (page: number) => void
}

export type TUserProps = {
    user: TUser,
    followingInProgress: number[],
    followUserThunkCreator: (userId: number) => void,
    unFollowUserThunkCreator: (userId: number) => void,
}

export type TUsersListProps = {
    users: TUser[],
    followingInProgress: number[],
    followUserThunkCreator: (userId: number) => void,
    unFollowUserThunkCreator: (userId: number) => void,
}

export type TLoginFormProps = {
    authorizedUserId: number,
    serverErrorMessage: string,
    captchaUrl: string,
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type TUserData = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

export type TLoginFormValues = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

export type TMapStateToPropsLogin ={
    authorizedUserId: number | null,
    isAuth: boolean,
    serverErrorMessage: string,
    captchaUrl: string | null
}

export type TMapDispatchToPropsLogin ={
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type TLoginProps = TMapStateToPropsLogin & TMapDispatchToPropsLogin;


export type TAddPostFormProps = {
    addPost: (data: string) => void
}

export type TAddPostFormValue = {
    post: string
}

export type TMyPostsProps = {
    statePosts: TPost[],
    addPostTC: (data: string) => void
}

export type ProfileInfoProps = {
    ownerId: number,
    currentId: number,
    profile: TProfile,
    status: string,
    updateStatus: (status: string) => void,
    saveAvatarTC: (file: File) => void,
    saveProfile: (data: TProfileDataFormValue) => Promise<void>
}

export type TProfileDataFormValue = {
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    'contacts.facebook':string,
    'contacts.website': string,
    'contacts.vk': string,
    'contacts.twitter': string,
    'contacts.instagram': string,
    'contacts.youtube': string,
    'contacts.github': string,
    'contacts.mainLink': string,
}

export type TProfileDataFormProps = {
    profile: TProfile,
    saveProfile: (data: TProfileDataFormValue) => Promise<void>,
    EditModeOff: () => void
}

export type TProfileStatusWithHooksProps = {
    status: string,
    updateStatus: (status: string) => void
}

export type THeaderProps = {
    userId: number,
    login: string,
    isAuth: boolean,
    logoutTC:()=> void
}

export type TMapStateHeaderContainer = {
    userId: number,
    login: string,
    isAuth: boolean
}
export type TMapDispatchHeaderContainer = {
    logoutTC: () => void
}

export type TUserMessagesProps = {
    messagesAll: TMessage[]
}

export type TUserNameListProps = {
    userData: {
        _id: number,
        name: string
    }[]
}
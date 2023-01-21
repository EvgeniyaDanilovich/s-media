import { updateObjectInArray } from '../utils/object-transformation';
import { TUsersActions, TUsersThunk, UsersInitState } from '../models/types-red';
import { TUser } from '../models/common-types';
import { AppStateType } from './redux-store';
import { Dispatch } from 'redux';
import { userAPI } from '../api/user-api';

export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET_USERS';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState: UsersInitState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

export const usersReducer = (state = initialState, action: TUsersActions): UsersInitState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
                // users: state.users.map(u => {
                //     if (u.id === action.userId) return { ...u, followed: true };
                //     return u;
                // })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
                // users: state.users.map(u => {
                //     if (u.id === action.userId) return { ...u, followed: false };
                //     return u;
                // })
            };

        case SET_USERS:
            return { ...state, users: action.users };

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage };

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount };

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId)
            };

        default:
            return state;
    }
};

// export const follow = (userId: number): FollowAction => ({ type: FOLLOW, userId });
// export const unFollow = (userId: number): UnFollowAction => ({ type: UNFOLLOW, userId });
// export const setUsers = (users: TUser[]): SetUsersAction => ({ type: SET_USERS, users });
// export const setCurrentPage = (currentPage: number): SetCurrentPageAction => ({ type: SET_CURRENT_PAGE, currentPage });
// export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountAction => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
// export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingAction => ({ type: TOGGLE_IS_FETCHING, isFetching });
// export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressAction => ({
//     type: TOGGLE_IS_FOLLOWING_PROGRESS,
//     isFetching,
//     userId
// });


export const usersActions = {
    follow: (userId: number) => ({ type: FOLLOW, userId } as const),
    unFollow: (userId: number) => ({ type: UNFOLLOW, userId } as const),
    setUsers: (users: TUser[]) => ({ type: SET_USERS, users } as const),
    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } as const)
};


export const getUsersThunkCreator = (currentPage: number, pageSize: number) =>
    async (dispatch: Dispatch<TUsersActions>, getState: () => AppStateType) => {
        dispatch(usersActions.toggleIsFetching(true));
        dispatch(usersActions.setCurrentPage(currentPage));

        const data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(usersActions.toggleIsFetching(false));
        dispatch(usersActions.setUsers(data.items));
        dispatch(usersActions.setTotalUsersCount(data.totalCount));
    };

const _followUnfollowFlow = async (userId: number, dispatch: Dispatch<TUsersActions>, apiMethod: any,
                                   actionCreator: (userId: number) => TUsersActions) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId));
    const response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(usersActions.toggleFollowingProgress(false, userId));
};

export const unFollowUserThunkCreator = (userId: number): TUsersThunk =>
    (dispatch, getState) => {
        const apiMethod = userAPI.unFollowUser.bind(userAPI);
        _followUnfollowFlow(userId, dispatch, apiMethod, usersActions.unFollow);
    };

export const followUserThunkCreator = (userId: number): TUsersThunk => async (dispatch) => {
    const apiMethod = userAPI.followUser.bind(userAPI);
    _followUnfollowFlow(userId, dispatch, apiMethod, usersActions.follow);
};
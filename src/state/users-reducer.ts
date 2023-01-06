import { userAPI } from '../api/Api';
import { updateObjectInArray } from '../utils/object-transformation';
import {
    FollowAction,
    SetCurrentPageAction,
    SetTotalUsersCountAction,
    SetUsersAction, ToggleFollowingProgressAction,
    ToggleIsFetchingAction,
    UnFollowAction,
    User,
    UsersInitState
} from '../models/types-red';

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

export const usersReducer = (state = initialState, action):UsersInitState  => {
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

export const follow = (userId: number): FollowAction => ({ type: FOLLOW, userId });
export const unFollow = (userId: number): UnFollowAction => ({ type: UNFOLLOW, userId });
export const setUsers = (users: User[]): SetUsersAction => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number): SetCurrentPageAction => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountAction => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingAction => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressAction => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });


export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));

    const data = await userAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
};

const followUnfollowFlow = async (userId: number, dispatch, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    const response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const unFollowUserThunkCreator = (userId: number) => (dispatch) => {
    const apiMethod = userAPI.unFollowUser.bind(userAPI);
    followUnfollowFlow(userId, dispatch, apiMethod, unFollow);
};

export const followUserThunkCreator = (userId: number) => async (dispatch) => {
    const apiMethod = userAPI.followUser.bind(userAPI);
    followUnfollowFlow(userId, dispatch, apiMethod, follow);
};
import { profileAPI } from '../api/Api';
import {
    AddPostAction,
    MainInitState,
    MainInitStateProfile,
    Photos,
    SetAvatarSuccessAction,
    SetStatusAction,
    SetUserProfileAction
} from '../models/types-red';

export const ADD_POST = 'main/ADD-POST';
export const SET_USER_PROFILE = 'main/SET_USER_PROFILE';
export const SET_STATUS = 'main/SET_STATUS';
export const SET_AVATAR_SUCCESS = 'main/SET_AVATAR_SUCCESS';

const initialState: MainInitState = {
    posts: [
        { id: 1, message: 'Hello. I\'m react developer' },
        { id: 2, message: 'My dinner' },
        { id: 3, message: 'Post about me' }
    ],
    profile: null,
    status: ''
};

export const mainReducer = (state = initialState, action): MainInitState => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: 4,
                message: action.post
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_STATUS: {
            return { ...state, status: action.status };
        }
        case SET_AVATAR_SUCCESS: {
            return { ...state, profile: { ...state.profile, photos: action.photos } as MainInitStateProfile };
        }

        default:
            return state;
    }
};

export const addPost = (post: string): AddPostAction => ({ type: ADD_POST, post });
export const setUserProfile = (profile: MainInitStateProfile): SetUserProfileAction => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status: string): SetStatusAction => ({ type: SET_STATUS, status });
export const setAvatarSuccess = (photos: Photos): SetAvatarSuccessAction => ({ type: SET_AVATAR_SUCCESS, photos });

export const getProfileThunkCreator = (userId: number) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const getStatusThunkCreator = (userId: number) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};

export const updateStatusThunkCreator = (status: string) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const saveAvatarTC = (file: string) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setAvatarSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile: MainInitStateProfile) => async (dispatch, getState) => {
    const userId = getState().auth.id;

    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId));
    } else {
        return Promise.reject(response.data.messages[0]);
    }
};

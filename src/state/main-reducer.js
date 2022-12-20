import { profileAPI } from '../api/Api';

const ADD_POST = 'main/ADD-POST';
const SET_USER_PROFILE = 'main/SET_USER_PROFILE';
const SET_STATUS = 'main/SET_STATUS';
const SET_AVATAR_SUCCESS = 'main/SET_AVATAR_SUCCESS';

const initialState = {
    posts: [
        { id: 1, message: 'Hello. I\'m react developer' },
        { id: 2, message: 'My dinner' },
        { id: 3, message: 'Post about me' }
    ],
    profile: null,
    status: ''
};

export const mainReducer = (state = initialState, action) => {
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
            return { ...state, profile: { ...state.profile, photos: action.photos } };
        }

        default:
            return state;
    }
};

export const addPost = (post) => ({ type: ADD_POST, post });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const setAvatarSuccess = (photos) => ({ type: SET_AVATAR_SUCCESS, photos });

export const getProfileThunkCreator = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const getStatusThunkCreator = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};

export const updateStatusThunkCreator = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const saveAvatarTC = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setAvatarSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;

    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId));
    } else {
        return Promise.reject(response.data.messages[0]);
    }
};

import { MainInitState, TMainActions, TMainThunk } from '../models/types-red';
import { TPhotos, TProfile } from '../models/common-types';
import { profileAPI } from '../api/profile-api';
import { ResultCodes } from '../enums/enums';

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

export const mainReducer = (state = initialState, action: TMainActions): MainInitState => {
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
            return { ...state, profile: { ...state.profile, photos: action.photos } as TProfile };
        }

        default:
            return state;
    }
};

// export const addPost = (post: string): AddPostAction => ({ type: ADD_POST, post });
// export const setUserProfile = (profile: TProfile): SetUserProfileAction => ({ type: SET_USER_PROFILE, profile });
// export const setStatus = (status: string): SetStatusAction => ({ type: SET_STATUS, status });
// export const setAvatarSuccess = (photos: TPhotos): SetAvatarSuccessAction => ({ type: SET_AVATAR_SUCCESS, photos });

export const mainActions = {
    addPost: (post: string) => ({ type: ADD_POST, post }  as const),
    setUserProfile: (profile: TProfile) => ({ type: SET_USER_PROFILE, profile } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    setAvatarSuccess: (photos: TPhotos) => ({ type: SET_AVATAR_SUCCESS, photos } as const)
}

export const addPostTC = (post:string):TMainThunk => (dispatch) =>{
    dispatch(mainActions.addPost(post));
}

export const getProfileTC = (userId: number): TMainThunk => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(mainActions.setUserProfile(response.data));
};

export const getStatusTC = (userId: number): TMainThunk => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(mainActions.setStatus(response.data));
};

export const updateStatusTC = (status: string): TMainThunk => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === ResultCodes.SUCCESS) {
        dispatch(mainActions.setStatus(status));
    }
};

export const saveAvatarTC = (file: File): TMainThunk => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === ResultCodes.SUCCESS) {
        dispatch(mainActions.setAvatarSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile: TProfile): TMainThunk => async (dispatch, getState) => {
    const userId = getState().auth.id;

    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === ResultCodes.SUCCESS) {
        dispatch(getProfileTC(userId));
    } else {
        return Promise.reject(response.data.messages[0]);
    }
};

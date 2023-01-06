import { authAPI, securityAPI } from '../api/Api';
import { AuthInitState, GetCaptchaUrlSuccessAction, SetAuthUserDataAction, SetServerErrorMessageAction } from '../models/types-red';

export const SET_USER_DATA = 'auth/SET_USER_DATA';
export const SET_SERVER_ERROR_MESSAGE = 'auth/SET_SERVER_ERROR_MESSAGE';
export const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const initialState: AuthInitState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    serverErrorMessage: '',
    captchaUrl: null
};

export const authReducer = (state = initialState, action): AuthInitState => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                serverErrorMessage: ''
            };

        case SET_SERVER_ERROR_MESSAGE:
            return {
                ...state,
                serverErrorMessage: action.message
            };

        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };

        default:
            return state;
    }
};

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataAction => ({
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth }
});
export const setServerErrorMessage = (message: string): SetServerErrorMessageAction => ({ type: SET_SERVER_ERROR_MESSAGE, message });
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessAction => ({ type: GET_CAPTCHA_URL_SUCCESS, captchaUrl });

export const getAuthUserDataTC = () => async (dispatch) => {
    const response = await authAPI.me();

    if (response.data.resultCode === 0) {
        const { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataTC());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrlTC());
        }
        dispatch(setServerErrorMessage(response.data.messages[0]));
    }
};

export const getCaptchaUrlTC = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logoutTC = () => async (dispatch) => {
    const response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};
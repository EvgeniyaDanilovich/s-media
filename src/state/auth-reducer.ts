import { AuthInitState, TAuthActions, TAuthThunk } from '../models/types-red';
import { ResultCodes } from '../enums/enums';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';

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

export const authReducer = (state = initialState, action: TAuthActions): AuthInitState => {
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

// export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataAction => ({
//     type: SET_USER_DATA,
//     payload: { id, email, login, isAuth }
// });
// export const setServerErrorMessage = (message: string): SetServerErrorMessageAction => ({ type: SET_SERVER_ERROR_MESSAGE, message });
// export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessAction => ({ type: GET_CAPTCHA_URL_SUCCESS, captchaUrl });

export const authActions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA,
        payload: { id, email, login, isAuth }
    } as const),
    setServerErrorMessage: (message: string) => ({ type: SET_SERVER_ERROR_MESSAGE, message } as const),
    getCaptchaUrlSuccess:(captchaUrl: string) => ({ type: GET_CAPTCHA_URL_SUCCESS, captchaUrl } as const)
}

export const  getAuthUserDataTC = (): TAuthThunk => async (dispatch) => {
    const response = await authAPI.me();

    if (response.data.resultCode === ResultCodes.SUCCESS) {
        const { id, email, login } = response.data.data;
        dispatch(authActions.setAuthUserData(id, email, login, true));
    }
};

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): TAuthThunk => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === ResultCodes.SUCCESS) {
        dispatch(getAuthUserDataTC());
    } else {
        if (response.data.resultCode === ResultCodes.CAPTCHA_IS_REQUIRED) {
            dispatch(getCaptchaUrlTC());
        }
        dispatch(authActions.setServerErrorMessage(response.data.messages[0]));
    }
};

export const getCaptchaUrlTC = (): TAuthThunk => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(authActions.getCaptchaUrlSuccess(captchaUrl));
};

export const logoutTC = (): TAuthThunk => async (dispatch) => {
    const response = await authAPI.logout();

    if (response.data.resultCode === ResultCodes.SUCCESS) {
        dispatch(authActions.setAuthUserData(null, null, null, false));
    }
};
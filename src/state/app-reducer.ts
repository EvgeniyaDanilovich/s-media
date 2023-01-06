import { getAuthUserDataTC } from './auth-reducer';
import { AppInitState, InitializedSuccessAction } from '../models/types-red';

export const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState: AppInitState = {
    initialized: false
};

export const appReducer = (state: AppInitState = initialState, action): AppInitState => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;
    }
};

export const initializedSuccess = (): InitializedSuccessAction => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
    const promise = dispatch(getAuthUserDataTC());
    promise.then(() => dispatch(initializedSuccess()));
};

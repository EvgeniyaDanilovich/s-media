import { getAuthUserDataTC } from './auth-reducer';
import { AppInitState, TAppActions, TAppThunk } from '../models/types-red';

export const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS';

const initialState: AppInitState = {
    initialized: false
};

export const appReducer = (state: AppInitState = initialState, action: TAppActions): AppInitState => {
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

// export const initializedSuccess = (): InitializedSuccessAction => ({ type: INITIALIZED_SUCCESS });

export const appActions = {
    initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const)
}

export const initializeApp = (): TAppThunk => (dispatch) => {
    const promise = dispatch(getAuthUserDataTC());
    // @ts-ignore
    promise.then(() => dispatch(appActions.initializedSuccess()));
};

import { MessageInitState, TMessageActions, TMessageThunk } from '../models/types-red';

export const ADD_MESSAGE = 'message/ADD-MESSAGE';

const initialState: MessageInitState = {
    messages: [
        {
            id: 1,
            message: 'Hello'
        },
        {
            id: 2,
            message: 'Hello too'
        },
        {
            id: 3,
            message: 'How are you'
        }
    ]
};

export const messageReducer = (state = initialState, action: TMessageActions): MessageInitState => {
    switch (action.type) {
        case ADD_MESSAGE:
            const messageItem = {
                id: 10,
                message: action.message
            };
            return {
                ...state,
                messages: [...state.messages, messageItem],
            };

        default:
            return state;
    }
};

// export const addMessage = (message: string): AddMessageAction => ({ type: ADD_MESSAGE, message });

export const messageActions = {
    addMessage: (message: string) => ({ type: ADD_MESSAGE, message } as const)
}

export const addMessageTC = (message: string): TMessageThunk => (dispatch) => {
    dispatch(messageActions.addMessage(message));
}

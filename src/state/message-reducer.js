const ADD_MESSAGE = 'ADD-MESSAGE';

const initialState = {
    messagesJson: [
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

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const messageItem = {
                id: 10,
                message: action.message
            };
            return {
                ...state,
                messagesJson: [...state.messagesJson, messageItem],
            };

        default:
            return state;
    }
};

export const addMessage = (message) => ({ type: ADD_MESSAGE, message });

import { mainReducer } from './main-reducer';
import { messageReducer } from './message-reducer';

export const store = {
    _state: {
        messagesPage: {
            newMessageText: '',
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
        },
        mainPage: {
            newPostText: 'Jenny',
            posts: [
                {
                    id: 1,

                    message: 'Hello. I\'m react developer'
                },
                {
                    id: 2,
                    message: 'My dinner'
                },
                {
                    id: 3,
                    message: 'Post about me'
                }
            ]
        },
        usersPage: {}
    },
    _callSubscriber() {
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.mainPage = mainReducer(this._state.mainPage, action);
        this._state.messagesPage = messageReducer(this._state.messagesPage, action);

        this._callSubscriber(this._state);
    }
};

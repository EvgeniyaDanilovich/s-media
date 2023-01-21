import React from 'react';
import {  addMessageTC } from '../../state/message-reducer';
import MessagesPage from './MessagesPage';
import { connect } from 'react-redux';
import { WithAuthNavigate } from '../../hoc/WithAuthNavigate';
import { compose } from 'redux';
import { AppStateType } from '../../state/redux-store';

const mapStateToProps = (state: AppStateType) => {
    return {
        messages: state.messagesPage.messages
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, { addMessageTC }),
    WithAuthNavigate
)(MessagesPage);



// const mapDispatchToProps = (dispatch) => {
//     return {
//         addMessage: () => {
//             dispatch(addMessageActionCreator());
//         },
//         showText: (newTextValue) => {
//             const action = updateMessageTextActionCreator(newTextValue);
//             dispatch(action);
//         }
//     }
// };

// const AuthNavigateComponent = WithAuthNavigate(MessagesPage);
// const MessagesPageContainer = connect(mapStateToProps, mapDispatchToProps)(AuthNavigateComponent);
// export default MessagesPageContainer;



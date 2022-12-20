import React from 'react';
import { addMessage } from '../../state/message-reducer';
import MessagesPage from './MessagesPage';
import { connect } from 'react-redux';
import { WithAuthNavigate } from '../../hoc/WithAuthNavigate';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        stateMessagesPage: state.messagesPage
    };
};

export default compose(
    connect(mapStateToProps, { addMessage }),
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



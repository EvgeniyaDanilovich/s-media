import React from 'react';
import { TUserMessagesProps } from '../../../models/types-components';

const UserMessages: React.FC<TUserMessagesProps> = ({ messagesAll }) => {
    return (
        <div >
            {messagesAll.map((message) => (
                <div key={message.id}>{message.message}</div>
            ))}
        </div>
    );
};

export default UserMessages;
import React from 'react';
import styles from './UserMessages.module.css';

const UserMessages = ({ messagesAll }) => {
    return (
        <div >
            {messagesAll.map((message) => (
                <div key={message.id}>{message.message}</div>
            ))}
        </div>
    );
};

export default UserMessages;
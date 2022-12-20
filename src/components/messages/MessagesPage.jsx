import React, { useEffect, useState } from 'react';
import styles from './MessagesPage.module.css';
import UserNameList from './userNameList/UserNameList';
import UserMessages from './userMessagesList/UserMessages';
import AddMessageForm from './messageForm/AddMessageForm';

const MessagesPage = ({ stateMessagesPage, addMessage }) => {
    const [data, setData] = useState([]);

    async function getData() {
        try {
            const response = await fetch('https://the-one-api.dev/v2/character?limit=10', {
                headers: {
                    Authorization: 'Bearer il9lJnwMYrGaUAPq3xgA',
                },
            });
            const data = await response.json();
            setData(data.docs);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container">
            <div className={styles.MessagesPageWrapper}>
                <UserNameList userData={data} />
                <div className={styles.messagesColumn}>
                    <UserMessages messagesAll={stateMessagesPage.messagesJson} />
                    <AddMessageForm addMessage={addMessage}/>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;
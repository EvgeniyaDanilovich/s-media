import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserNameList.module.css';

const UserNameList = ({ userData }) => {
    return (
        <div className={styles.wrapper}>
            {userData.map((user) => (
                <div key={user._id}>
                    <NavLink to={`/messages/${user._id}`}>{user.name}</NavLink>
                </div>
            ))}
        </div>
    );
};

export default UserNameList;
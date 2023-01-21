import React from 'react';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import styles from './UserNameList.module.css';
import { TUserNameListProps } from '../../../models/types-components';

const UserNameList: React.FC<TUserNameListProps> = ({ userData }) => {
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
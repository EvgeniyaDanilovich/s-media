import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../../assets/images/garfild.jpg';
import { NavLink } from 'react-router-dom';
// headers: {
//     'API_KEY': '2fb5263a-5ecb-4413-a235-0318942ab844'
// }
const User = ({ user, followingInProgress, followUserThunkCreator, unFollowUserThunkCreator }) => {
    return (
        <div className={styles.userRow}>
            <div>
                <NavLink to={`/main/${user.id}`}>
                    <div className={styles.photo}><img src={!!user.photos.small ? user.photos.small
                        : userPhoto} alt="avatar" /></div>
                </NavLink>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unFollowUserThunkCreator(user.id);
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            followUserThunkCreator(user.id);
                        }}>Follow</button>}
                </div>
            </div>
            <div className={styles.userColumn}>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </div>
            </div>
        </div>
    );
};

export default User;
import React from 'react';
import styles from './usersList/Users.module.css';
import axios from 'axios';
// import userPhoto from './assets/images/garfild'
import userPhoto from '../../assets/images/garfild.jpg';
//
// const UsersPage = ({ users, follow, unFollow, setUsers }) => {
//
//     // if(users.length === 0){
//     const getUsers = () => {
//         axios.get('https://social-network.samuraijs.com/api/1.0/users')
//             .then((response) => {
//                 console.log(response);
//                 setUsers(response.data.items);
//             });
//     };
//     // }
//
//     const onUnFollow = () => {
//         unFollow();
//     };
//
//     const onFollow = () => {
//         follow();
//     };
//
//     return (
//         <div className="container">
//             {
//                 users.map((user) => (
//                     <div className={styles.userRow} key={user.id}>
//                         <div>
//                             <div className={styles.photo}><img src={!!user.photos.small ? user.photos.small
//                                 : userPhoto} alt="avatar" /></div>
//                             <div>
//                                 {user.followed
//                                     ? <button onClick={() => {
//                                         unFollow(user.id);
//                                     }}>Unfollow</button>
//                                     : <button onClick={() => {
//                                         follow(user.id);
//                                     }}>Follow</button>}
//                             </div>
//                         </div>
//                         <div className={styles.userColumn}>
//                             <div>
//                                 <div>{user.name}</div>
//                                 <div>{user.status}</div>
//                             </div>
//                             <div>
//                                 <div>{'user.location.country'}</div>
//                                 <div>{'user.location.city'}</div>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             }
//             <button onClick={getUsers}>Get users</button>
//         </div>
//     );
// };

// export default UsersPage;
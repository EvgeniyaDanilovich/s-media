import React from 'react';
import User from './User';
// headers: {
//     'API_KEY': '2fb5263a-5ecb-4413-a235-0318942ab844'
// }
const UsersList = ({ users, followingInProgress, followUserThunkCreator, unFollowUserThunkCreator }) => {
    return (
        <div>
            {users.map((user) => (
                <User key={user.id} user={user} followingInProgress={followingInProgress}
                      followUserThunkCreator={followUserThunkCreator} unFollowUserThunkCreator={unFollowUserThunkCreator}/>
            ))}
        </div>
    );
};

export default UsersList;

import React from 'react';
import User from './User';
import { TUserProps, TUsersListProps } from '../../../models/types-components';
// headers: {
//     'API_KEY': '2fb5263a-5ecb-4413-a235-0318942ab844'
// }

const UsersList: React.FC<TUsersListProps> = ({ users, followingInProgress, followUserThunkCreator, unFollowUserThunkCreator }) => {
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

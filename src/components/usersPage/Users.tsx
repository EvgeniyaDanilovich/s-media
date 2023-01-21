import React from 'react';
import UsersList from './usersList/UsersList';
// @ts-ignore
import Preloader from '../common/preloader/Preloader';
import Pagination from '../common/pagination/Pagination';
import { UsersProps } from '../../models/types-components';

const Users: React.FC<UsersProps> = ({
                   users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress,
                   followUserThunkCreator, unFollowUserThunkCreator, onPageChanged
               }: UsersProps) => {

    return (
        <div className="container">
            <Pagination pageSize={pageSize} totalItemsCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged} />

            {isFetching ? <Preloader /> : null}

            <UsersList users={users}
                       followingInProgress={followingInProgress}
                       followUserThunkCreator={followUserThunkCreator}
                       unFollowUserThunkCreator={unFollowUserThunkCreator} />
        </div>);
};

export default Users;
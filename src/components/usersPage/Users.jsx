import React from 'react';
import styles from './usersList/Users.module.css';
import UsersList from './usersList/UsersList';
import Preloader from '../common/preloader/Preloader';
import Pagination from '../common/pagination/Pagination';

const Users = ({
                   users,
                   pageSize,
                   totalUsersCount,
                   currentPage,
                   isFetching,
                   followingInProgress,
                   followUserThunkCreator,
                   unFollowUserThunkCreator,
                   onPageChanged
               }) => {

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
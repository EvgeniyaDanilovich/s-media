import React, { useEffect } from 'react';
import UsersList from './usersList/UsersList';
import Preloader from '../common/preloader/Preloader';
import Pagination from '../common/pagination/Pagination';
import { UsersProps } from '../../models/types-components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../state/users-selectors';
import { followUserThunkCreator, getUsersThunkCreator, unFollowUserThunkCreator } from '../../state/users-reducer';

// totalUsersCount
// currentPage
// pageSize
// isFetching
//onPageChanged
// followingInProgress
// followUserThunkCreator, unFollowUserThunkCreator

const Users: React.FC<UsersProps> = (/*{ }: UsersProps*/) => {

    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const isFetching = useSelector(getIsFetching);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();
    const onPageChanged = (page: number) => {
        // @ts-ignore
        dispatch(getUsersThunkCreator(page, pageSize));
    };

    const follow = (userId: number) => {
        // @ts-ignore
        dispatch(followUserThunkCreator(userId));
    }

    const unFollow = (userId: number) => {
        // @ts-ignore
        dispatch(unFollowUserThunkCreator(userId));
    }

    useEffect(()=>{
        // @ts-ignore
        dispatch(getUsersThunkCreator(currentPage, pageSize));
    }, [])

    return (
        <div className="container">
            <Pagination pageSize={pageSize} totalItemsCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged} />

            {isFetching ? <Preloader /> : null}

            <UsersList users={users}
                       followingInProgress={followingInProgress}
                       followUserThunkCreator={follow}
                       unFollowUserThunkCreator={unFollow} />
        </div>);
};

export default Users;
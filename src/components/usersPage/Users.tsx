import React, { useEffect } from 'react';
import UsersList from './usersList/UsersList';
import Preloader from '../common/preloader/Preloader';
import Pagination from '../common/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../state/users-selectors';
import { followUserThunkCreator, getUsersThunkCreator, unFollowUserThunkCreator } from '../../state/users-reducer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

// totalUsersCount
// currentPage
// pageSize
// isFetching
//onPageChanged
// followingInProgress
// followUserThunkCreator, unFollowUserThunkCreator

export type UserSearchFormValues = {
    search: string
}

const UserSearchForm: React.FC = () =>{
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<UserSearchFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<UserSearchFormValues> = (data ) => {
        console.log(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div><input type={'search'} {...register('search')}/></div>
            <button>Search</button>
        </form>
    )
}

const Users: React.FC = () => {

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

    const navigate = useNavigate();
    let { userId } = useParams();

    useEffect(()=>{
        // @ts-ignore
        dispatch(getUsersThunkCreator(currentPage, pageSize));
    }, [])

    return (
        <div className="container">
            <UserSearchForm />
            <Pagination pageSize={pageSize} totalItemsCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged} />

            {isFetching ? <Preloader /> : null}

            <UsersList users={users}
                       followingInProgress={followingInProgress}
                       followUserThunkCreator={follow}
                       unFollowUserThunkCreator={unFollow} />
        </div>);
};

export default Users;
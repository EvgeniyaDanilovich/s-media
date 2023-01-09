import { User } from './types-red';

export type PaginationProps = {
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    onPageChanged: (page: number) => void,
    portionSize?: number
}

export type UsersProps = {
    users: User[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
    followUserThunkCreator: (userId: number) => void,
    unFollowUserThunkCreator: (userId: number) => void,
    onPageChanged: (page: number) => void
}

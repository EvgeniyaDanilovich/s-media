import React from 'react';
import { connect } from 'react-redux';
import { followUserThunkCreator, getUsersThunkCreator, unFollowUserThunkCreator } from '../../state/users-reducer';
import Users from './Users';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../state/users-selectors';
import { TUser } from '../../models/common-types';
import { AppStateType } from '../../state/redux-store';

// export type UsersAPIComponentProps = {
//     users: TUser[],
//     currentPage: number,
//     pageSize: number,
//     totalUsersCount: number,
//     isFetching: boolean,
//     followingInProgress: number[],
//     getUsersThunkCreator: (currentPage:number, pageSize: number) => void,
//     followUserThunkCreator: (userId: number) => void,
//     unFollowUserThunkCreator: (userId: number) => number
// }

export type TMapStateToProps = {
    users: TUser[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
}
export type TMapDispatchToProps = {
    followUserThunkCreator: (userId: number) => void,
    unFollowUserThunkCreator: (userId: number) => number
    getUsersThunkCreator: (currentPage:number, pageSize: number) => void,
}

type UsersAPIComponentProps = TMapStateToProps & TMapDispatchToProps;

class UsersAPIComponent extends React.Component<UsersAPIComponentProps> {
    constructor(props: UsersAPIComponentProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page: number) => {
        this.props.getUsersThunkCreator(page, this.props.pageSize);
    };

    render() {
        return (<Users users={this.props.users}
                       pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       isFetching={this.props.isFetching}
                       followingInProgress={this.props.followingInProgress}
                       followUserThunkCreator={this.props.followUserThunkCreator}
                       unFollowUserThunkCreator={this.props.unFollowUserThunkCreator}
                       onPageChanged={this.onPageChanged}
        />);
    }
}

const mapStateToProps = (state: AppStateType): TMapStateToProps => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};

// <TMapStateToProps, TMapDispatchToProps, AppStateType>
const UsersPageContainer = connect(mapStateToProps, {
    followUserThunkCreator, unFollowUserThunkCreator, getUsersThunkCreator
})(UsersAPIComponent);

export default UsersPageContainer;

// const mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(follow(userId));
//         },
//         unFollow: (userId) => {
//             dispatch(unFollow(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsers(users));
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPage(currentPage));
//         },
//         setTotalUsersCount: (totalUsersCount) =>{
//             dispatch(setTotalUsersCount(totalUsersCount));
//         },
//         toggleIsFetching:(isFetching) =>{
//             dispatch(toggleIsFetching(isFetching));
//         }
//     };
// };

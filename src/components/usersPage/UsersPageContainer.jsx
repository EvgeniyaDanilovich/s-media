import React from 'react';
import { connect } from 'react-redux';
import { followUserThunkCreator, getUsersThunkCreator, unFollowUserThunkCreator } from '../../state/users-reducer';
import Users from './Users';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../state/users-selectors';

class UsersAPIComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page) => {
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

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};

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

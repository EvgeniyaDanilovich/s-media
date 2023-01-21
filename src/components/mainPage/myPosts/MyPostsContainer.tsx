import React from 'react';
import { addPostTC } from '../../../state/main-reducer';
import { MyPosts } from './MyPosts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../state/redux-store';

const mapStoreToProps = (state: AppStateType) => {
    return {
        statePosts: state.mainPage.posts,
        stateNewPostText: state.mainPage.newPostText
    };
};

export const MyPostsContainer = connect(mapStoreToProps, {addPostTC})(MyPosts);

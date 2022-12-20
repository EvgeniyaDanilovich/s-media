import React from 'react';
import { addPost } from '../../../state/main-reducer';
import { MyPosts } from './MyPosts';
import { connect } from 'react-redux';

const mapStoreToProps = (state) => {
    return {
        statePosts: state.mainPage.posts,
        stateNewPostText: state.mainPage.newPostText
    };
};

export const MyPostsContainer = connect(mapStoreToProps, {addPost})(MyPosts);

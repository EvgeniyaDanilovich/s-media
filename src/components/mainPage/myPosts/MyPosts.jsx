import React from 'react';
import Posts from './posts/Posts';
import AddPostForm from '../addPostForm/AddPostForm';

export const MyPosts = ({ statePosts, addPost }) => {

    return (
        <div>
            <h3>My posts</h3>
            <AddPostForm addPost={addPost} />
            <Posts posts={statePosts} />
        </div>
    );
};

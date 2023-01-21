import React from 'react';
import Posts from './posts/Posts';
import AddPostForm from '../addPostForm/AddPostForm';
import { TPost } from '../../../models/common-types';
import { TMyPostsProps } from '../../../models/types-components';
import { addPostTC } from '../../../state/main-reducer';

export const MyPosts: React.FC<TMyPostsProps> = ({ statePosts, addPostTC }) => {

    return (
        <div>
            <h3>My posts</h3>
            <AddPostForm addPost={addPostTC} />
            <Posts posts={statePosts} />
        </div>
    );
};

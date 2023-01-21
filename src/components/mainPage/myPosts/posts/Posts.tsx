import React from 'react';
// @ts-ignore
import styles from './Posts.module.css';
import { TPosts } from '../../../../models/common-types';

const Posts: React.FC<TPosts> = ({posts}) => {
    return (
        <div className={styles.postsWrapper}>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                     <div className={styles.message} >{post.message}</div>
                </div>
            ))}
        </div>
    );
};

export default Posts;
import React from 'react';
import styles from './Posts.module.css';

const Posts = ({posts}) => {
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
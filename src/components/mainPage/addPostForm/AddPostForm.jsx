import React from 'react';
import styles from '../myPosts/MyPosts.module.css';
import { useForm } from 'react-hook-form';

const AddPostForm = ({ addPost }) => {
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        addPost(data.post);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register('post', {
                required: 'Enter text please',
                maxLength: { value: 30, message: 'Max length is 30 symbols' }
            })}
                      placeholder="Enter text" className={styles.textarea}></textarea>
            {errors?.post && <p>{errors?.post.message}</p>}
            <button className={styles.button}>Add post</button>
        </form>
    );
};

export default AddPostForm;
import React from 'react';
// @ts-ignore
import styles from '../myPosts/MyPosts.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TAddPostFormProps, TAddPostFormValue } from '../../../models/types-components';

const AddPostForm: React.FC<TAddPostFormProps> = ({ addPost }) => {
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<TAddPostFormValue>();

    const onSubmit: SubmitHandler<TAddPostFormValue> = (data: TAddPostFormValue) => {
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
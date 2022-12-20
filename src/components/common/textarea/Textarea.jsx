import React from 'react';
import styles from '../../mainPage/myPosts/MyPosts.module.css';
import { useForm } from 'react-hook-form';

// const {register, handleSubmit, reset, formState: { errors }} = useForm();

const Textarea = () =>{
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    return(
        <div>
             <textarea {...register('message', {
                 required: 'Enter text please',
                 maxLength: {value: 30, message: 'Max length is 30 symbols' } })}
                       placeholder="Enter message"></textarea>
            {errors?.message && <p>{errors?.message.message}</p>}
        </div>
)}

export default Textarea;
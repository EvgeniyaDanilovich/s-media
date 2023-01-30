import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserSearchFormValues } from '../../models/types-components';

export const UserSearchForm: React.FC = () =>{
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<UserSearchFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<UserSearchFormValues> = (data ) => {
        console.log(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div><input type={'search'} {...register('search')}/></div>
            <button>Search</button>
        </form>
    )
}
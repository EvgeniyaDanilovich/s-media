import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// @ts-ignore
import styles from '../../myPosts/MyPosts.module.css';
import { TProfileDataFormProps, TProfileDataFormValue } from '../../../../models/types-components';
import { TProfileContacts } from '../../../../models/common-types';


const ProfileDataForm: React.FC<TProfileDataFormProps> = ({ profile, saveProfile, EditModeOff }) => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<TProfileDataFormValue>({
        defaultValues: {
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            'contacts.facebook': profile.contacts.facebook,
            'contacts.website': profile.contacts.website,
            'contacts.vk': profile.contacts.vk,
            'contacts.twitter': profile.contacts.twitter,
            'contacts.instagram': profile.contacts.instagram,
            'contacts.youtube': profile.contacts.youtube,
            'contacts.github': profile.contacts.github,
            'contacts.mainLink': profile.contacts.mainLink,
        }
    });

    const [ serverErrorMessage, setServerErrorMessage] = useState('');

    const onSubmit: SubmitHandler<TProfileDataFormValue> = async (data: TProfileDataFormValue) => {
        saveProfile(data).then(() => {
            EditModeOff();
        }).catch((error: Error) => {
            setServerErrorMessage(`${error}`);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <button>Save</button>
            <div>
                <label>
                    Full name:
                    <input type={'text'} {...register('fullName', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} />
                    {errors?.fullName && <p>{errors?.fullName.message}</p>}
                </label>
            </div>

            <div>
                <label>
                    Looking for a job:
                    <input type={'checkbox'} {...register('lookingForAJob')} />
                </label>
            </div>

            <div>
                <label>
                    My professional skills:
                    <textarea {...register('lookingForAJobDescription')}></textarea>
                </label>
            </div>

            <div>
                <label>
                    About me:
                    <textarea {...register('aboutMe')}></textarea>
                </label>
            </div>
            <div><span>Contacts: </span>
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <div key={key}>
                            <span>{key}:</span>
                            <input type={'text'} {
                                // @ts-ignore
                                ...register(`contacts.${key}`)} />
                        </div>);
                })}
            </div>
            {serverErrorMessage ? <p className={styles.error}>{serverErrorMessage}</p> : undefined}
        </form>
    );
};

export default ProfileDataForm;
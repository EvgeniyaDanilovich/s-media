import React, { ChangeEvent, useState } from 'react';
// @ts-ignore
import Preloader from '../../common/preloader/Preloader';
// @ts-ignore
import ProfileStatusWithHooks from './profileStatus/ProfileStatusWithHooks';
// @ts-ignore
import userPhoto from '../../../assets/images/garfild.jpg';
// @ts-ignore
import styles from './ProfileInfo.module.css';
// @ts-ignore
import ProfileData from './profileData/ProfileData';
import ProfileDataForm from './profileDataForm/ProfileDataForm';
import { ProfileInfoProps } from '../../../models/types-components';

const ProfileInfo: React.FC<ProfileInfoProps> = ({ ownerId, currentId, profile, status,
                                                     updateStatus, saveAvatarTC, saveProfile }) => {
    const isOwner = ownerId === Number(currentId);
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />;
    }

    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement> ) => {
        if (event.target.files.length) {
            saveAvatarTC(event.target.files[0]);
        }
    };

    return (
        <div>
            <div className={styles.mainPhoto}><img src={profile.photos.large || userPhoto} alt="user photo" /></div>
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
            {editMode
                ? <ProfileDataForm profile={profile} saveProfile={saveProfile} EditModeOff={() => {
                    setEditMode(false);
                }
                } />
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                    setEditMode(true);
                }} />}

            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    );
};

export default ProfileInfo;
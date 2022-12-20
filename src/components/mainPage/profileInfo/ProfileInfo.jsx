import React, { useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatusWithHooks from './profileStatus/ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/garfild.jpg';
import styles from './ProfileInfo.module.css';
import ProfileData from './profileData/ProfileData';
import ProfileDataForm from './profileDataForm/ProfileDataForm';

const ProfileInfo = ({ ownerId, currentId, profile, status, updateStatus, saveAvatarTC, saveProfile }) => {
    const isOwner = ownerId === Number(currentId);

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />;
    }

    const onMainPhotoSelected = (event) => {
        if (event.target.files.length) {
            saveAvatarTC(event.target.files[0]);
        }
        console.log(event.target.files);
    };

    return (
        <div>
            <div className={styles.mainPhoto}><img src={profile.photos.large || userPhoto} alt="user photo" /></div>
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
            {editMode
                ? <ProfileDataForm profile={profile} saveProfile={saveProfile} EditModeOff={()=> {
                    setEditMode(false)
                }
                }/>
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                    setEditMode(true);
                }} />}

            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    );
};

export default ProfileInfo;
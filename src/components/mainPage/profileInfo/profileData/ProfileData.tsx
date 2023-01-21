import React from 'react';
import { TProfile, TProfileContacts } from '../../../../models/common-types';

export type TContactProps = {
    contactTitle: string,
    contactValue: string
}
export type TProfileDataProps = {
    profile: TProfile,
    isOwner: boolean,
    goToEditMode: () => void
}

const Contact: React.FC<TContactProps> = ({ contactTitle, contactValue }) => {
    return (
        <div><span>{contactTitle}</span>: {contactValue}</div>
    );
};

const ProfileData: React.FC<TProfileDataProps> = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
            <div><span>Full name: </span>{profile.fullName}</div>
            <div><span>looking for a job: </span>{profile.lookingForAJob ? 'Yes' : 'No'}</div>
            {
                profile.lookingForAJob && <div><span>My professional skills: </span>{profile.lookingForAJobDescription}</div>
            }
            <div><span>About me: </span>{profile.aboutMe}</div>
            <div><span>Contacts: </span>{Object.keys(profile.contacts).map((key) => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof TProfileContacts]} />;
            })}</div>
        </div>
    );
};

export default ProfileData;
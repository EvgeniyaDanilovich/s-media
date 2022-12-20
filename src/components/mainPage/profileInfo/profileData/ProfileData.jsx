import React from 'react';

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div><span>{contactTitle}</span>: {contactValue}</div>
    );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
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
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />;
            })}</div>
        </div>
    );
};

export default ProfileData;
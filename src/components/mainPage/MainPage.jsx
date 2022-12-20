import React from 'react';
import { MyPostsContainer } from './myPosts/MyPostsContainer';
import ProfileInfo from './profileInfo/ProfileInfo';

const MainPage = ({ ownerId, currentId, profile, status, updateStatus, saveAvatarTC, saveProfile }) => {

    return (
        <div className='container'>
            <ProfileInfo ownerId={ownerId} currentId={currentId} profile={profile} status={status}
                         updateStatus={updateStatus} saveAvatarTC={saveAvatarTC} saveProfile={saveProfile}/>
            <MyPostsContainer />
        </div>
        )
};

export default MainPage;
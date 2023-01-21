import React from 'react';
import { MyPostsContainer } from './myPosts/MyPostsContainer';
import ProfileInfo from './profileInfo/ProfileInfo';
import { TProfile } from '../../models/common-types';
import { TProfileDataFormValue } from '../../models/types-components';

export type TMainPageProps = {
    ownerId: number,
    currentId: number,
    profile: TProfile,
    status: string,
    updateStatus: (status: string)=> void,
    saveAvatarTC: (file: File)=> void,
    saveProfile:(data: TProfileDataFormValue) => Promise<void>
}

const MainPage: React.FC<TMainPageProps> = ({ ownerId, currentId, profile, status, updateStatus, saveAvatarTC, saveProfile }) => {

    return (
        <div className='container'>
            <ProfileInfo ownerId={ownerId} currentId={currentId} profile={profile} status={status}
                         updateStatus={updateStatus} saveAvatarTC={saveAvatarTC} saveProfile={saveProfile}/>
            <MyPostsContainer />
        </div>
        )
};

export default MainPage;
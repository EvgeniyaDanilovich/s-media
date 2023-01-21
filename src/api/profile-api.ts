import { instance } from './api';
import { TPhotos, TProfile } from '../models/common-types';
import { TResponse, TSavePhotos } from '../models/types-api';

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<TProfile>(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put<TResponse>(`profile/status`, { status: status });
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<TResponse<TSavePhotos>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: TProfile){
        return instance.put<TResponse>('profile', profile)
    }
};

import { instance } from './api';
import { TGetItems, TResponse } from '../models/types-api';

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<TGetItems>(`users?page=${currentPage}&count=${pageSize}`,)
            .then((response) => {
                return response.data;
            });
    },
    unFollowUser(userId: number) {
        return instance.delete<TResponse>(`follow/${userId}`);
    },
    followUser(userId: number) {
        return instance.post<TResponse>(`follow/${userId}`);
    }
};

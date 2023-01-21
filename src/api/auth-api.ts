import { instance } from './api';
import { TLoginResponseData, TMeResponseData, TResponse } from '../models/types-api';

export const authAPI = {
    me() {
        return instance.get<TResponse<TMeResponseData>>('auth/me');
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<TResponse<TLoginResponseData>>('auth/login', { email, password, rememberMe, captcha });
    },
    logout() {
        return instance.delete('auth/login');
    }
};

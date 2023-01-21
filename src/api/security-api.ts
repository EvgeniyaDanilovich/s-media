import { instance } from './api';

export type TGetCaptchaUrlResponse = {
    url: string
}


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<TGetCaptchaUrlResponse>('/security/get-captcha-url');
    }
};

import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '2fb5263a-5ecb-4413-a235-0318942ab844'
    }
});

// export const userAPI = {
//     getUsers(currentPage = 1, pageSize = 10) {
//         return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
//             .then((response) => {
//                 return response.data;
//             });
//     },
//     unFollowUser(userId: number) {
//         return instance.delete(`follow/${userId}`);
//     },
//     followUser(userId: number) {
//         return instance.post(`follow/${userId}`);
//     }
// };



// export const authAPI = {
//     me() {
//         return instance.get<TMeResponse>('auth/me');
//     },
//     login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
//         return instance.post<TLoginResponse>('auth/login', { email, password, rememberMe, captcha });
//     },
//     logout() {
//         return instance.delete('auth/login');
//     }
// };

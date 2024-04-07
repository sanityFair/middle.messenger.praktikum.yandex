import { UserRequest, ChangePasswordRequest } from '../types';
import { BaseApi } from './base-api';

class UserApi extends BaseApi {
    constructor() {
        super('/user');
    }

    updateUserProfile(data: UserRequest) {
        return this.http.put('/profile', { data, headers: { 'content-type': 'application/json' } });
    }

    updateUserPassword(data: ChangePasswordRequest) {
        return this.http.put('/password', {
            data,
            headers: { 'content-type': 'application/json' },
        });
    }

    updateUserAvatar(data: FormData) {
        return this.http.put('/profile/avatar', {
            data,
        });
    }
}

export const userApi = new UserApi();

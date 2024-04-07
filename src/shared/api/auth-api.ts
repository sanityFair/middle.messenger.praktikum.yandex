import { SingInRequest, SingUpRequest } from '../types/auth-api';
import { BaseApi } from './base-api';

class AuthApi extends BaseApi {
    constructor() {
        super('/auth');
    }

    signUp(data: SingUpRequest) {
        return this.http.post('/signup', {
            headers: {
                'content-Type': 'application/json',
            },
            data,
        });
    }
    signIn(data: SingInRequest) {
        return this.http.post('/signin', {
            headers: {
                'content-Type': 'application/json',
            },
            data,
        });
    }
    getUser() {
        return this.http.get('/user');
    }
    logOut() {
        return this.http.post('/logout');
    }
}

export const auth = new AuthApi();

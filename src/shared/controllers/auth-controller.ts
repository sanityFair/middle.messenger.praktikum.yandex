import { auth } from '../api/auth-api';
import { SingInRequest, SingUpRequest } from '../types/auth-api';
import { router } from '../utils';
import store from '../utils/store';

export class AuthController {
    static async login(data: SingInRequest) {
        try {
            await auth.signIn(data);
            const response = await auth.getUser();
            store.set('user', JSON.stringify(response.responseText));
            store.set('isAuth', true);
            router.go('/messenger');
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
        }
    }

    static async checkCurrentSession() {
        try {
            const response = await auth.getUser();

            if (response.status === 200) {
                store.set('isAuth', true);
                store.set('user', JSON.parse(response.responseText));
                router.go('/messenger');
            }
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
            router.go('/');
        }
    }

    static async register(data: SingUpRequest) {
        try {
            await auth.signUp(data);
            const currentUser = await auth.getUser();
            store.set('user', JSON.parse(currentUser.responseText));
            store.set('isAuth', true);
            router.go('/messenger');
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
            router.go('/');
        }
    }

    static async logout() {
        try {
            await auth.logOut();
            router.go('/');
            store.resetState();
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
            router.go('/');
        }
    }
}

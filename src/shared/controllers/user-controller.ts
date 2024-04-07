import { userApi, auth } from '../api';
import { UserRequest, ChangePasswordRequest } from '../types';
import { router } from '../utils';
import store from '../utils/store';

export class UserController {
    static async updateProfile(data: UserRequest) {
        try {
            await userApi.updateUserProfile(data);
            const response = await auth.getUser();
            store.set('user', JSON.stringify(response.responseText));
            router.go('/settings');
        } catch (error) {
            store.set('isAuth', false);
            router.go('/');
        }
    }

    static async updatePassword(data: ChangePasswordRequest) {
        try {
            await userApi.updateUserPassword(data);
            router.go('/settings');
        } catch (error) {
            store.set('isAuth', false);
            router.go('/');
        }
    }

    static async updateAvatar(data: FormData) {
        try {
            const response = await userApi.updateUserAvatar(data);
            const user = JSON.parse(response.responseText);

            store.set(
                'user.avatar',
                'https://ya-praktikum.tech/api/v2/resources'.concat(user.avatar),
            );
        } catch (error) {
            store.set('isAuth', false);
            router.go('/');
        }
    }
}

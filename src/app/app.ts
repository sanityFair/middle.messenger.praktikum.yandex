import * as components from '@/shared/ui';
import * as features from '@/features';
import { BlockConstructable, registerComponent, router } from '@/shared/utils';

import './app.module.css';
import {
    ChatPage,
    LoginPage,
    SignUpPage,
    ChangePasswordPage,
    ChangeProfilePage,
    ProfilePage,
} from '@/pages';
import { AuthController } from '@/shared/controllers/auth-controller';

Object.values({ ...components, ...features }).forEach((component) =>
    registerComponent(component as BlockConstructable<Record<string, unknown>>),
);

document.addEventListener('DOMContentLoaded', () => {
    AuthController.checkCurrentSession();

    router
        .use('/', LoginPage)
        .use('/sign-up', SignUpPage)
        .use('/settings', ProfilePage)
        .use('/change-password', ChangePasswordPage)
        .use('/change-profile', ChangeProfilePage)
        .use('/messenger', ChatPage)
        .start();
});



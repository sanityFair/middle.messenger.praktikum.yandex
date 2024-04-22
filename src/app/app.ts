import * as components from '../shared/ui';
import * as features from '../features';
import { BlockConstructable, registerComponent, router } from '../shared/utils';

import {
    ChatPage,
    LoginPage,
    SignUpPage,
    ChangePasswordPage,
    ChangeProfilePage,
    ProfilePage,
    NotFoundPage,
    ErrorPage,
} from '../pages';
import { AuthController } from '../shared/controllers/auth-controller';

import './app.module.css';

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
        .use('/500', ErrorPage)
        .use('/404', NotFoundPage)
        .start();
});

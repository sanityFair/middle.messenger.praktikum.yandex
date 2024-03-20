import * as components from '@/shared/ui';
import * as features from '@/features';
import { BlockConstructable, registerComponent } from '@/shared/utils';

import './app.module.css';

import { renderDOM } from '@/shared/utils/render-dom';
import {
    ChatPage,
    LoginPage,
    SignInPage,
    ChangePasswordPage,
    ChangeProfilePage,
    ErrorPage,
    NotFoundPage,
    ProfilePage,
} from '@/pages';

Object.values({ ...components, ...features }).forEach((component) =>
    registerComponent(component as BlockConstructable<Record<string, unknown>>),
);

const pages = {
    login: [new LoginPage()],
    signIn: [new SignInPage()],
    error: [new ErrorPage()],
    notFound: [new NotFoundPage()],
    chats: [new ChatPage()],
    profile: [new ProfilePage()],
    сhangePasswordPage: [new ChangePasswordPage()],
    сhangeProfilePage: [new ChangeProfilePage()],
};

const navigate = (page: keyof typeof pages) => {
    const [source] = pages[page];

    renderDOM(source);
};

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (e) => {
    const page = (e.target as HTMLElement)?.getAttribute('page') as keyof typeof pages;

    if (!page) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    navigate(page);
});

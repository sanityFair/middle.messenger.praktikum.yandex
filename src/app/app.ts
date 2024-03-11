import Handlebars from 'handlebars';
import * as Components from '@/shared/ui';
import * as Pages from '@/pages';
import * as Features from '@/features';
import { renderTemplate } from '@/shared/utils';
import { icons } from '@/shared/icons';

import styles from './app.module.css';
import { chatsMock } from '@/shared/mocks';

const pages = {
    login: [Pages.LoginPage],
    signIn: [Pages.SignInPage],
    error: [Pages.ErrorPage],
    notFound: [Pages.NotFoundPage],
    chats: [Pages.ChatPage],
    profile: [Pages.ProfilePage],
    сhangePasswordPage: [Pages.ChangePasswordPage],
    сhangeProfilePage: [Pages.ChangeProfilePage],
};

Object.entries({ ...Components, ...Features }).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

document.addEventListener('DOMContentLoaded', () => navigate('login'));

const navigate = (page: keyof typeof pages) => {
    const [source] = pages[page];

    renderTemplate<{
        icons: typeof icons;
        chats?: typeof chatsMock;
        styles?: typeof styles;
    }>({
        template: source,
        styles,
        context: {
            icons,
            chats: chatsMock,
            styles,
        },
        containerId: '#app',
    });
};

document.addEventListener('click', (e) => {
    const page = (e.target as HTMLElement)?.getAttribute('page') as keyof typeof pages;

    if (!page) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    navigate(page);
});

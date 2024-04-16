import { Block, router } from '@/shared/utils';
import styles from './personal-information.module.css';
import { AuthController } from '@/shared/controllers/auth-controller';
import { User } from '@/shared/types';

type PersonalInformationProps = {
    styles?: CSSModuleClasses;
    logout?: () => void;
    redirectToChangeProfile?: () => void;
    redirectToChangePassword?: () => void;
};

export class PersonalInformation extends Block<PersonalInformationProps> {
    static componentName: string = 'PersonalInformation';

    constructor(user: Partial<User>) {
        super({ styles, ...user });

        this.setProps({
            logout: () => {
                AuthController.logout();
            },
            redirectToChangeProfile: () => router.go('/change-profile'),
            redirectToChangePassword: () => router.go('/change-password'),
        });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.personal-information}}>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Почта</p>
                    <p class={{styles.value}}>{{email}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Логин</p>
                    <p class={{styles.value}}>{{login}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Имя</p>
                    <p class={{styles.value}}>{{second_name}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Фамилия</p>
                    <p class={{styles.value}}>{{first_name}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Имя в чате</p>
                    <p class={{styles.value}}>{{display_name}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Телефон</p>
                    <p class={{styles.value}}>{{phone}}</p>
                </div>
                <div class={{styles.personal-spacer}}></div>
                <div class={{styles.personal-action}}>
                    {{{ Button title="Изменить данные"  link="true" onClick=redirectToChangeProfile className=styles.change-info }}}
                </div>
                <div class={{styles.personal-action}}>
                    {{{ Button title="Изменить пароль"  link="true" onClick=redirectToChangePassword className=styles.change-password }}}
                </div>
                <div class={{styles.personal-action}}>
                    {{{ Button title="Выйти"  link="true" onClick=logout className=styles.exit }}}
                </div>
            </div>
        `;
    }
}

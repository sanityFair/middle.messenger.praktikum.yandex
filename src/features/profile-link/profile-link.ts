import { Block, router } from '@/shared/utils';
import { icons } from '@/shared/icons';
import styles from './profile-link.module.css';

type ProfileLinkProps = {
    styles?: CSSModuleClasses;
    icon?: string;
    onRedirectClick?: () => void;
};

export class ProfileLink extends Block<ProfileLinkProps> {
    static componentName: string = 'ProfileLink';

    constructor() {
        super({ styles, icon: icons.ProfileArrow });

        this.setProps({
            onRedirectClick: () => router.go('/settings'),
        });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.profile-link}}>
                {{{ Button title="Профиль" link="true" onClick=onRedirectClick }}}
                <img src={{icon}} alt="Иконка профиля" />
            </div> 
        `;
    }
}

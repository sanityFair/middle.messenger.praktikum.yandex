import { Block } from '@/shared/utils';
import { icons } from '@/shared/icons';
import styles from './profile-link.module.css';

type ProfileLinkProps = {
    styles?: CSSModuleClasses;
    icon?: string;
};

export class ProfileLink extends Block<ProfileLinkProps> {
    static componentName: string = 'ProfileLink';

    constructor() {
        super({ styles, icon: icons.ProfileArrow });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.profile-link}}>
                <a page='profile'>Профиль</a>
                <img src={{icon}} />
            </div> 
        `;
    }
}

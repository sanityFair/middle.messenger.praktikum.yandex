import { Block } from '@/shared/utils';
import styles from './profile-avatar.module.css';
import { icons } from '@/shared/icons';

type ProfileAvatarProps = {
    styles?: CSSModuleClasses;
    icon?: string;
};

export class ProfileAvatar extends Block<ProfileAvatarProps> {
    static componentName: string = 'ProfileAvatar';

    constructor() {
        super({ styles, icon: icons.ProfileAvatar });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.profile-avatar}}>
                <label>
                    <input type='file' />
                    <figure class={{styles.profile-figure}}>
                        <img src={{icon}} class={{styles.profile-avatar}} alt='avatar' />
                        <figcaption class={{styles.profile-figcaption}}></figcaption>
                    </figure>
                </label>
                <p>{{first_name}}</p>
            </div>
    
        `;
    }
}

import { Block } from '@/shared/utils';
import styles from './profile-avatar.module.css';
import { icons } from '@/shared/icons';
import { UserController } from '@/shared/controllers';
import store, { StoreEvents } from '@/shared/utils/store';
import { User } from '@/shared/types';

interface HandleNameChangeInterface {
    target: HTMLInputElement;
}

type ProfileAvatarProps = {
    styles?: CSSModuleClasses;
    icon?: string;
    events?: {
        change?: (e: HandleNameChangeInterface) => void;
    };
};

export class ProfileAvatar extends Block<ProfileAvatarProps> {
    static componentName: string = 'ProfileAvatar';

    constructor() {
        super({ styles });
        const user = store.getState().user as User;
        store.on(StoreEvents.Updated, () => {
            const user = store.getState().user as User;

            if (user.avatar) {
                this.setProps({
                    icon: user.avatar,
                });
            }
        });

        this.setProps({
            icon: user.avatar
                ? 'https://ya-praktikum.tech/api/v2/resources'.concat(user.avatar)
                : icons.ProfileAvatar,
            events: {
                change: (e) => {
                    if (!e.target.files?.item(0)) return;
                    const formData = new FormData();
                    formData.append('avatar', e.target.files[0]);

                    UserController.updateAvatar(formData);
                },
            },
        });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.profile-avatar}}>
            <form id="myUserForm">
                <label>
                    {{{ Input type='file' id='avatar' className=styles.avatar name="avatar" onChange=change }}}
                    <figure class={{styles.profile-figure}}>
                        <img src={{icon}} class={{styles.profile-avatar}} alt='avatar' />
                        <figcaption class={{styles.profile-figcaption}}></figcaption>
                    </figure>
                </label>
                <p>{{first_name}}</p>
                </form>
            </div>
    
        `;
    }
}

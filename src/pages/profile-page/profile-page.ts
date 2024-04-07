import { Block } from '@/shared/utils';
import styles from './profile-page.module.css';
import store from '@/shared/utils/store';
import { User } from '@/shared/types';

type ProfilePageProps = Partial<User> & {
    styles?: CSSModuleClasses;
};

export class ProfilePage extends Block<ProfilePageProps> {
    static componentName: string = 'ProfilePage';

    constructor() {
        super({ styles });

        this.setProps({
            ...(store.getState().user as User),
        });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.profile-page}}>
                {{{ Backward }}}
                <div class={{styles.profile-wrapper}}>
                    {{{ ProfileAvatar first_name=first_name }}}
                    {{{ PersonalInformation first_name=first_name second_name=second_name display_name=display_name login=login email=email phone=phone }}}
                </div>
            </div>
        `;
    }
}

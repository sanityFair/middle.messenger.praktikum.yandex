import { Block } from '@/shared/utils';
import styles from './profile-page.module.css';

type ProfilePageProps = {
    styles?: CSSModuleClasses;
};

export class ProfilePage extends Block<ProfilePageProps> {
    static componentName: string = 'ProfilePage';

    constructor() {
        super({ styles });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.profile-page}}>
                {{{ Backward }}}
                <div class={{styles.profile-wrapper}}>
                    {{{ ProfileAvatar first_name="Иван" }}}
                    {{{ PersonalInformation first_name="Иван" second_name="Дурак" display_name="Ivan" login="ivanivanov" email="mail@mail.ru" phone="+79090876754" }}}
                </div>
            </div>
        `;
    }
}

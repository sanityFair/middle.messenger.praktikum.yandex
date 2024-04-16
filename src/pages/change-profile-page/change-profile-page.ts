import { Block } from '@/shared/utils';
import styles from './change-profile-page.module.css';
import { UserController } from '@/shared/controllers';
import { User } from '@/shared/types';
import store from '@/shared/utils/store';

type ChangeProfilePageProps = Partial<User> & {
    onSubmit?: (event: SubmitEvent) => void;
    styles?: Record<string, string>;
};

export class ChangeProfilePage extends Block<ChangeProfilePageProps> {
    static componentName: string = 'ChangeProfilePage';

    constructor() {
        super({ styles });

        this.setProps({
            ...(store.getState().user as User),
            onSubmit: (e) => {
                e.preventDefault();
                const forms = document.forms[1];
                
                const { email, login, second_name, first_name, phone, display_name } = forms;

                if (
                    email.value &&
                    login.value &&
                    second_name.value &&
                    phone.value &&
                    first_name.value &&
                    display_name.value
                ) {
                    UserController.updateProfile({
                        login: login.value,
                        email: email.value,
                        second_name: second_name.value,
                        phone: phone.value,
                        first_name: first_name.value,
                        display_name: display_name.value,
                    });
                }
            },
        });
    }

    render() {
        // language=hbs
        return `
                <div class={{styles.change-profile-page}}>
                    {{{ Backward }}}
                    <div class={{styles.change-profile-wrapper}}>
                        {{{ ProfileAvatar first_name="" }}}
                        <form>
                            <fieldset>
                                <label>Почта</label>
                                {{{ Input name="email" type="text" className=styles.input value=email required="true"  }}}
                            </fieldset>
                             <fieldset>
                                <label>Логин</label>
                                {{{ Input name="login" type="text" className=styles.input value=login required="true" }}}
                            </fieldset>
                            <fieldset>
                                <label>Имя</label>
                                {{{ Input name="first_name" type="text" className=styles.input value=first_name required="true"  }}}
                            </fieldset>
                              <fieldset>
                                <label>Фамилия</label>
                                {{{ Input name="second_name" type="text" className=styles.input value=second_name required="true" }}}
                            </fieldset>
                              <fieldset>
                                <label>Имя в чате</label>
                                {{{ Input name="display_name" type="text" className=styles.input value=display_name required="false" }}}
                            </fieldset>
                             <fieldset>
                                <label>Телефон</label>
                                {{{ Input name="phone" type="text" className=styles.input value=phone required="true"  }}}
                            </fieldset>
                            <div class={{styles.spacer}}></div>
                            {{{ Button title="Сохранить" button=true onClick=onSubmit block=true className=styles.submit }}}
                        </form>
                    </div>
                </div>
        `;
    }
}

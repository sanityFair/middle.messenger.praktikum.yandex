import { Block, hasErrorForm } from '@/shared/utils';
import styles from './change-profile-page.module.css';

type ChangeProfilePageProps = {
    onSubmit?: (event: SubmitEvent) => void;
    styles?: Record<string, string>;
};

export class ChangeProfilePage extends Block<ChangeProfilePageProps> {
    static componentName: string = 'ChangeProfilePage';

    constructor() {
        super({ styles });

        this.setProps({
            onSubmit: (e) => {
                e.preventDefault();
                const isError = hasErrorForm(this.children);
                const forms = document.forms[0];

                const { email, login, second_name, first_name, phone, display_name } = forms;

                if (
                    !isError &&
                    email.value &&
                    login.value &&
                    second_name.value &&
                    phone.value &&
                    first_name.value &&
                    display_name.value
                ) {
                    console.log({
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
                                {{{ Input name="email" type="text" className=styles.input value="mail@mail.ru" required="true"  }}}
                            </fieldset>
                             <fieldset>
                                <label>Логин</label>
                                {{{ Input name="login" type="text" className=styles.input value="ivanivanov" required="true" }}}
                            </fieldset>
                            <fieldset>
                                <label>Имя</label>
                                {{{ Input name="first_name" type="text" className=styles.input value="Иван" required="true"  }}}
                            </fieldset>
                              <fieldset>
                                <label>Фамилия</label>
                                {{{ Input name="second_name" type="text" className=styles.input value="Иванов" required="true" }}}
                            </fieldset>
                              <fieldset>
                                <label>Имя в чате</label>
                                {{{ Input name="display_name" type="text" className=styles.input value="Ivan" required="true" }}}
                            </fieldset>
                             <fieldset>
                                <label>Телефон</label>
                                {{{ Input name="phone" type="text" className=styles.input value="+79090876754" required="true"  }}}
                            </fieldset>
                            <div class={{styles.spacer}}></div>
                            {{{ Button title="Сохранить" button=true page="profile" block=true className=styles.submit }}}
                        </form>
                    </div>
                </div>
        `;
    }
}

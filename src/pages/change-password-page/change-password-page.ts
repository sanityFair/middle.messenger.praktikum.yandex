import { Block, hasErrorForm } from '@/shared/utils';
import styles from './change-password-page.module.css';
import { UserController } from '@/shared/controllers';

interface SubmitEvent extends Event {
    submitter: HTMLElement;
}

type ChangePasswordPageProps = {
    onSubmit?: (event: SubmitEvent) => void;
    onInput?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    styles?: CSSModuleClasses;
};

export class ChangePasswordPage extends Block<ChangePasswordPageProps> {
    static componentName: string = 'ChangePasswordPage';

    constructor() {
        super({ styles });

        this.setProps({
            onSubmit: (e) => {
                e.preventDefault();
                const isError = hasErrorForm(this.children);
                const forms = document.forms[0];

                const { oldPassword, newPasswrord, repeatNewPassword } = forms;

                if (!isError && repeatNewPassword.value === newPasswrord.value) {
                    UserController.updatePassword({
                        oldPassword: oldPassword.value,
                        newPassword: newPasswrord.value,
                    });
                }
            },
        });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.change-password-page}}>
                {{{ Backward }}}
                <div class={{styles.change-password-wrapper}}>
                    {{{ ProfileAvatar first_name="" }}}
                    <form>
                        <fieldset>
                            <label>Старый пароль</label>
                            {{{ Input name="oldPassword" type="password" className=styles.password value="**********" }}}
                        </fieldset>
                         <fieldset>
                            <label>Новый пароль</label>
                            {{{ Input name="newPassword" type="password" className=styles.password value="**********"}}}
                        </fieldset>
                          <fieldset>
                            <label>Повторите новый пароль</label>
                            {{{ Input name="repeatNewPassword" type="password" className=styles.password value="**********" }}}
                        </fieldset>
                        <div class={{styles.spacer}}></div>
                        {{{ Button title="Сохранить" button=true page="profile" onClick=onSubmit block=true}}}
                    </form>
                </div>
            </div>
        `;
    }
}

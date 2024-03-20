import { Block, hasErrorForm } from '@/shared/utils';
import styles from './change-password-page.module.css';

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
                    console.log({
                        oldPassword: oldPassword.value,
                        newPasswrord: newPasswrord.value,
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
                            {{{ Input inputName="oldPassword" type="password" className=styles.password value="**********" }}}
                        </fieldset>
                         <fieldset>
                            <label>Новый пароль</label>
                            {{{ Input inputName="newPassword" type="password" className=styles.password value="**********"}}}
                        </fieldset>
                          <fieldset>
                            <label>Повторите новый пароль</label>
                            {{{ Input inputName="repeatNewPassword" type="password" className=styles.password value="**********" }}}
                        </fieldset>
                        <div class={{styles.spacer}}></div>
                        {{{ Button title="Сохранить" button=true page="profile" onClick=onSubmit block=true}}}
                    </form>
                </div>
            </div>
    
        `;
    }
}

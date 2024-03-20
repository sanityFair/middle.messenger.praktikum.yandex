import { Block, hasErrorForm } from '@/shared/utils';
import styles from './sign-in-page.module.css';

type SignInProps = {
    onSubmit?: (event: SubmitEvent) => void;
    onInput?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    styles?: Record<string, string>;
};

interface SubmitEvent extends Event {
    submit: HTMLElement;
}

export class SignInPage extends Block<SignInProps> {
    static componentName: string = 'SignInPage';

    constructor() {
        super({ styles });

        this.setProps({
            onSubmit: (e) => {
                e.preventDefault();
                const isError = hasErrorForm(this.children);
                const forms = document.forms[0];

                const { email, login, second_name, first_name, phone, oldPassword, newPassword } =
                    forms;

                if (
                    !isError &&
                    email.value &&
                    login.value &&
                    second_name.value &&
                    phone.value &&
                    first_name.value &&
                    oldPassword.value &&
                    newPassword.value
                ) {
                    console.log({
                        login: login.value,
                        email: email.value,
                        second_name: second_name.value,
                        phone: phone.value,
                        first_name: first_name.value,
                        oldPassword: oldPassword.value,
                        newPassword: newPassword.value,
                    });
                }
            },
        });
    }

    protected render(): string {
        // language=hbs
        return `
            <div class={{styles.sign-in}}>
                <div>
                    <h3 class={{styles.title}}>Регистрация</h3>
                    <form name="registration">
                        {{{ Input type="text" inputName="email" ref="email" childInputRef="email" id="email" label="Почта" placeholder="Почта" required="true" }}}
                        {{{ Input type="text" inputName="login" id="login" ref="login" childInputRef="login"   label="Логин" placeholder="Логин" required="true" }}}
                        {{{ Input type="text" inputName="second_name" id="second_name" ref="second_name" childInputRef="second_name"  label="Имя" placeholder="Имя" required="true" }}}
                        {{{ Input type="text" inputName="first_name" id="first_name" ref="first_name" childInputRef="first_name"  label="Фамилия" placeholder="Фамилия" required="true" }}}
                        {{{ Input type="text" inputName="phone" id="phone" ref="phone" childInputRef="phone"  label="Телефон" placeholder="Телефон" required="true" }}}
                        {{{ Input type="password" inputName="oldPassword" id="oldPassword" ref="oldPassword" childInputRef="oldPassword"   label="Пароль" placeholder="Пароль" required="true" }}}
                        {{{ Input type="password" inputName="newPassword" id="newPassword" ref="newPassword" childInputRef="newPassword" label="Пароль" placeholder="Пароль" required="true" }}}
                        <div>
                            {{{ Button title="Зарегистрироваться" onClick=onSubmit  button=true page="chats"}}}
                            {{{ Button title="Войти" link=true page="login"}}}
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
}

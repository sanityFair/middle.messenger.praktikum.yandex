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
                        {{{ Input type="text" name="email" id="email" label="Почта" placeholder="Почта" required="true" }}}
                        {{{ Input type="text" name="login" id="login" label="Логин" placeholder="Логин" required="true" }}}
                        {{{ Input type="text" name="first_name" id="first_name" label="Имя" placeholder="Имя" required="true" }}}
                        {{{ Input type="text" name="second_name" id="second_name" label="Фамилия" placeholder="Фамилия" required="true" }}}
                        {{{ Input type="text" name="phone" id="phone"  label="Телефон" placeholder="Телефон" required="true" }}}
                        {{{ Input type="password" name="oldPassword" id="oldPassword"  label="Пароль" placeholder="Пароль" required="true" }}}
                        {{{ Input type="password" name="newPassword" id="newPassword" label="Пароль" placeholder="Пароль" required="true" }}}
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

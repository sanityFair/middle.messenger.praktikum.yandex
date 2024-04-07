import { Block, router } from '@/shared/utils';
import styles from './login-page.module.css';
import { hasErrorForm } from '@/shared/utils/has-error-form';
import { AuthController } from '@/shared/controllers/auth-controller';

interface SubmitEvent extends Event {
    submitter: HTMLElement;
}

type LoginProps = {
    onSubmit?: (event: SubmitEvent) => void;
    onInput?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onRedirectSignUp?: () => void;
    styles?: CSSModuleClasses;
};

export class LoginPage extends Block<LoginProps> {
    static componentName: string = 'LoginPage';

    constructor() {
        super({ styles });

        this.setProps({
            onSubmit: (e) => {
                e.preventDefault();
                const isError = hasErrorForm(this.children);
                const forms = document.forms[0];

                const { login, password } = forms;

                if (!isError && login.value && password.value) {
                    AuthController.login({
                        login: login.value,
                        password: password.value,
                    });
                }
            },
            onRedirectSignUp: () => {
                router.go('/sign-up');
            },
        });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.container}}>
                <div class={{styles.card}}>
                    <h3 class={{styles.title}}>Вход</h3>
                    <form class={{styles.form}} name="sign-up" >
                        {{{ Input type="text" name="login" id="login" ref="login" childInputRef="login" label="Логин" placeholder="Логин" required="true" }}}
                        {{{ Input type="password" id="password" name="password" ref="password" childInputRef="password" label="Пароль" placeholder="Пароль" required="true" }}}
                        <div class={{styles.spacer}}></div>
                    <div class="{{styles.row}}">
                        {{{ Button title="Авторизоваться" button=true onClick=onSubmit page="chats" }}}
                        {{{ Button title="Нет аккаунта?" link="true" onClick=onRedirectSignUp }}}
                    </div>
                    </form>
                </div>
            </div>
        `;
    }
}

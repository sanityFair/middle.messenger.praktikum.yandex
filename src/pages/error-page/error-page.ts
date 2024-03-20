import { Block } from '@/shared/utils';
import styles from './error-page.module.css';

type ErrorPageProps = {
    styles?: CSSModuleClasses;
};

export class ErrorPage extends Block<ErrorPageProps> {
    static componentName: string = 'ErrorPage';

    constructor() {
        super({ styles });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.error}}>
                 <h2>500</h2>
                <p>Мы уже фиксим</p>
                {{{ Button link=true title="Назад к чатам" page="chats" }}}
            </div>
        `;
    }
}

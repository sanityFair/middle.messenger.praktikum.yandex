import { Block } from '@/shared/utils';
import styles from './not-found-page.module.css';

type NotFoundPageProps = {
    styles?: CSSModuleClasses;
};

export class NotFoundPage extends Block<NotFoundPageProps> {
    static componentName: string = 'NotFoundPage';

    constructor() {
        super({ styles });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.not-found}}>
                <h2>404</h2>
                <p>Не туда попали</p>
                {{{ Button link=true title="Назад к чатам" page="chats" }}}
            </div>
        `;
    }
}

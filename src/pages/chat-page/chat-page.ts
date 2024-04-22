import { Block } from '../../shared/utils';
import styles from './chat-page.module.css';

type ChatPageProps = {
    styles?: CSSModuleClasses;
};

export class ChatPage extends Block<ChatPageProps> {
    static componentName: string = 'ChatPage';

    constructor() {
        super({ styles });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.main-page}}>
                {{{ ChatRooms }}}
                {{{ ChatWorkSpace }}}
            </div>    
        `;
    }
}

import { Block } from '@/shared/utils';
import styles from './chat-action-bar.module.css';
import { icons } from '@/shared/icons';

type ChatActionBarProps = {
    styles?: CSSModuleClasses;
    paperClip: string;
    arrowForward: string;
};

export class ChatActionBar extends Block<ChatActionBarProps> {
    static componentName: string = 'ChatActionBar';

    constructor() {
        super({ styles, paperClip: icons.PaperClip, arrowForward: icons.ArrowForward });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.chat-action-bar}}>
                {{{ IconButton url=paperClip className=styles.file }}}
                <form>
                    {{{ Input type="text" placeholder="Сообщение" className=styles.message }}}
                    {{{ IconButton type="button" url=arrowForward }}}
                </form>
            </div>
        `;
    }
}

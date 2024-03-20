import { Block } from '@/shared/utils';
import styles from './chat-workspace.module.css';
import { ChatRoom } from '@/shared/types';

type ExternalProps = {
    chatSelected: boolean;
};

type ChatWorkSpaceProps = ExternalProps & {
    styles?: CSSModuleClasses;
    chats?: Partial<ChatRoom>[];
};

export class ChatWorkSpace extends Block<ChatWorkSpaceProps> {
    static componentName: string = 'ChatWorkSpace';

    constructor({ chatSelected = true }: ExternalProps) {
        super({ styles, chatSelected });
    }

    render() {
        // language=hbs
        return `
            {{#if chatSelected}}
                <div class={{styles.chat-selected}}>
                    {{{ ChatNavBar }}}
                    <div class={{styles.messages }}>
                        <span class={{styles.date }}>19 июня</span>
                        {{{ Message owner=true }}}
                        {{{ Message mate=true }}}
                        {{{ Message owner=true }}}
                        {{{ Message mate=true }}}
                        {{{ Message owner=true }}}
                        {{{ Message mate=true }}}
                        {{{ Message owner=true }}}
                        {{{ Message mate=true }}}
                    </div>
                    {{{ ChatActionBar }}}
                </div>
            {{else}}
                <div class={{styles.chat-not-selected}}>
                    <p>Выберите чат чтобы отправить сообщение</p>
                </div>
            {{/if}}
        `;
    }
}

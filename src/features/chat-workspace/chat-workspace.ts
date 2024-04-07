import { Block } from '@/shared/utils';
import styles from './chat-workspace.module.css';
import { ChatRoom } from '@/shared/types';
import store, { StoreEvents } from '@/shared/utils/store';

type ChatWorkSpaceProps = {
    styles?: CSSModuleClasses;
    chats?: Partial<ChatRoom>[];
    chatSelected?: boolean;
};

export class ChatWorkSpace extends Block<ChatWorkSpaceProps> {
    static componentName: string = 'ChatWorkSpace';
    chatSelected: boolean;

    constructor() {
        super({ styles });
        this.chatSelected = false;

        store.on(StoreEvents.Updated, () => {
            // вызываем обновление компонента, передав данные из хранилища
            this.setProps({
                chatSelected: Boolean(store.getState().selectedChatId),
                chats: store.getState().chats as Partial<ChatRoom>[],
            });
        });
    }

    render() {
        // language=hbs
        console.log(this.props.chats);

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

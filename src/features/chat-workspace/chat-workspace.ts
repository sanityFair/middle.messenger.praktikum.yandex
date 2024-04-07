import { Block } from '@/shared/utils';
import styles from './chat-workspace.module.css';
import { ChatRoom } from '@/shared/types';
import store, { StoreEvents } from '@/shared/utils/store';

type ChatWorkSpaceProps = {
    styles?: CSSModuleClasses;
    chats?: Partial<ChatRoom>[];
    chatSelected?: boolean;
    chatId?: number;
};

export class ChatWorkSpace extends Block<ChatWorkSpaceProps> {
    static componentName: string = 'ChatWorkSpace';
    chatSelected: boolean;

    constructor() {
        super({ styles });
        this.chatSelected = false;

        
        store.on(StoreEvents.Updated, () => {
            // вызываем обновление компонента, передав данные из хранилища
            const newChatId = store.getState().selectedChatId;

            if (this.props.chatId === newChatId) return;
            
            this.setProps({
                chatSelected: Boolean(store.getState().selectedChatId),
                chatId: store.getState().selectedChatId as number,
            });
        });
    }

    render() {
        // language=hbs

        return `
            {{#if chatSelected}}
                <div class={{styles.chat-selected}}>
                    {{{ ChatNavBar }}}
                    <div class={{styles.messages }}>
                        {{{ Message  }}}
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

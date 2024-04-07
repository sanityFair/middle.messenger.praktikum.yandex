import { Block } from '@/shared/utils';
import styles from './chat-rooms.module.css';
import { ChatRoom } from '@/shared/types';
import { icons } from '@/shared/icons';
import store, { StoreEvents } from '@/shared/utils/store';
import { ChatController } from '@/shared/controllers';

type ChatRoomsProps = {
    styles?: CSSModuleClasses;
    chats?: Partial<ChatRoom>[];
    icon?: string;
};

export class ChatRooms extends Block<ChatRoomsProps> {
    static componentName: string = 'ChatRooms';

    chats: Partial<ChatRoom>[] = [];

    constructor({ chats = [] }: ChatRoomsProps) {
        super({ styles, chats, icon: icons.Add });

        ChatController.getChats();

        store.on(StoreEvents.Updated, () => {
            // вызываем обновление компонента, передав данные из хранилища
            this.setProps({ chats: store.getState().chats as ChatRoom[] });
        });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.chat-rooms}}>
                <div class={{styles.nav}}>
                    {{{ ProfileLink }}}
                    {{{ Search }}}
                </div>
                <div class={{styles.chat-wrapper}}>
                    {{#each chats}}
                        {{#with this}}
                            {{{ ChatInfo unread_count=unread_count avatar=avatar id=id title=title content=last_message.content time=last_message.time }}}
                        {{/with}}
                    {{/each}}
                </div>
                {{{ AddChat }}}
            </div>
        `;
    }
}

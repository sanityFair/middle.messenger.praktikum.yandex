import { Block } from '@/shared/utils';
import styles from './chat-rooms.module.css';
import { ChatRoom } from '@/shared/types';
import { chatsMock } from '@/shared/mocks';

type ChatRoomsProps = {
    styles?: CSSModuleClasses;
    chats?: Partial<ChatRoom>[];
};

export class ChatRooms extends Block<ChatRoomsProps> {
    static componentName: string = 'ChatRooms';

    chats: Partial<ChatRoom>[] = [];

    constructor({ chats=chatsMock }: ChatRoomsProps) {
        super({ styles, chats });
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
                            {{{ ChatInfo unread_count=unread_count avatar=avatar title=title content=last_message.content time=last_message.time }}}
                        {{/with}}
                    {{/each}}
                </div>
            </div>  
        `;
    }
}

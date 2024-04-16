import { Block, getDateTime } from '@/shared/utils';
import styles from './chat-info.module.css';
import store from '@/shared/utils/store';
import { ChatController } from '@/shared/controllers';

type ExternalProps = {
    id?: number;
    avatar?: string;
    title?: string;
    time?: string;
    content?: string;
    unread_count?: number;
};

type ChatInfoProps = ExternalProps & {
    styles?: CSSModuleClasses;
    events?: {
        click?: () => void;
    };
};

export class ChatInfo extends Block<ChatInfoProps> {
    static componentName: string = 'ChatInfo';

    constructor({ time, ...props }: ExternalProps) {
        super({ styles, time: getDateTime(time, { dateStyle: 'short' }), ...props });

        this.setProps({
            events: {
                click: this.handleSelect.bind(this),
            },
        });
    }

    handleSelect() {
        store.set('selectedChatId', this.props.id);
        store.set('selectedChatTitle', this.props.title);

        ChatController.getChatToken();
        ChatController.getChatUsers(`${this.props.id}`);
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.chat-info}} id={{id}} onClick={{click}}>
                <div class={{styles.avatar}}>{{{ IconView url=avatar }}}</div>
                <div class={{styles.name}}>{{title}}</div>
                <div class={{styles.time}}>{{time}}</div>
                <div class={{styles.last-message}}>{{content}}</div>
                <div class={{styles.indicator}}>
                    {{{ Badge count=unread_count }}}
                </div>
            </div>
        `;
    }
}

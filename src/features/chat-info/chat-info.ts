import { Block } from '@/shared/utils';
import styles from './chat-info.module.css';

type ExternalProps = {
    avatar?: string;
    title?: string;
    time?: string;
    content?: string;
    unread_count?: number;
};

type ChatInfoProps = ExternalProps & {
    styles?: CSSModuleClasses;
};

export class ChatInfo extends Block<ChatInfoProps> {
    static componentName: string = 'ChatInfo';

    constructor(props: ExternalProps) {
        super({ styles, ...props });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.chat-info}}>
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

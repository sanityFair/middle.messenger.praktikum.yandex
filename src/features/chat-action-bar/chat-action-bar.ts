import { Block } from '@/shared/utils';
import styles from './chat-action-bar.module.css';
import { icons } from '@/shared/icons';
import { ChatController } from '@/shared/controllers';

type ChatActionBarProps = {
    styles?: CSSModuleClasses;
    paperClip: string;
    arrowForward: string;
    onSubmit?: (event: SubmitEvent) => void;
    webscoket?: WebSocket;
};

export class ChatActionBar extends Block<ChatActionBarProps> {
    static componentName: string = 'ChatActionBar';

    constructor() {
        super({ styles, paperClip: icons.PaperClip, arrowForward: icons.ArrowForward });

        this.setProps({
            onSubmit(e) {
                e.preventDefault();
                const messageInput = document.forms[2].message;
                
                if (messageInput.value) {
                    ChatController.wss?.send(
                        JSON.stringify({
                            type: 'message',
                            content: messageInput.value,
                        }),
                    );
                }

                messageInput.value = '';
            },
        });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.chat-action-bar}}>
                {{{ IconButton url=paperClip className=styles.file }}}
                <form name="chat">
                    {{{ Input type="text" placeholder="Сообщение" id="message" name="message" className=styles.message }}}
                    {{{ IconButton type="button" url=arrowForward  onClick=onSubmit}}}
                </form>
            </div>
        `;
    }
}

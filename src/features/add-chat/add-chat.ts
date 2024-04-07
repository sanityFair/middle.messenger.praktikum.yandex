import { Block } from '@/shared/utils';
import { icons } from '@/shared/icons';
import styles from './add-chat.module.css';
import { ChatController } from '@/shared/controllers';

type AddChatProps = {
    styles?: CSSModuleClasses;
    icon?: string;
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onSubmit?: () => void;
};

export class AddChat extends Block<AddChatProps> {
    static componentName: string = 'AddChat';
    private open: boolean;

    constructor() {
        super({ styles, icon: icons.Add, open: false });
        this.open = false;

        this.setProps({
            open: this.open,
            onOpen: this.handleOpen.bind(this),
            onClose: this.handleClose.bind(this),
            onSubmit: this.handleSubmit.bind(this),
        });
    }

    handleOpen() {
        this.setProps({ open: true });
    }

    handleClose() {
        this.setProps({ open: false });
    }

    handleSubmit() {
        const title = document.forms[0].chatName.value;

        if (title) {
            ChatController.createChat({ title });
            this.handleClose();
        }
    }

    render() {
        // language=hbs

        return `
        <div class={{styles.add-chat}}>
            <dialog class={{styles.modal-overlay}} open={{open}}>
                <div class={{styles.modal}}>
                    <div class={{styles.modal-content}}>
                        <form name="add-chat">
                            {{{ Input type="text" name="chatName" id="chatName" value=value label="Название чата" placeholder="Название чата" required=true}}}
                        </form>
                    </div>
                    <div class={{styles.modal-action}}>
                        {{{ Button title="Создать" button=true onClick=onSubmit page="chats" }}}
                        {{{ Button title="Закрыть" button=true onClick=onClose page="chats" }}}
                    </div>
                </div>
            </dialog>
            {{{ IconButton url=icon alt='add' onClick=onOpen }}}
        </div>
        `;
    }
}

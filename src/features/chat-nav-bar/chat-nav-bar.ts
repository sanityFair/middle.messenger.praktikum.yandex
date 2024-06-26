import { Block } from '@/shared/utils';
import styles from './chat-nav-bar.module.css';
import { icons } from '@/shared/icons';
import store, { StoreEvents } from '@/shared/utils/store';
import { ChatController } from '@/shared/controllers';

type ChatNavBarProps = {
    styles?: CSSModuleClasses;
    icon?: string;
    onDelete?: () => void;
    onAddUser?: (event: SubmitEvent) => void;
    onOpen?: () => void;
    onClose?: () => void;
    users?: unknown;
    open?: boolean;
    title?: string;
};

export class ChatNavBar extends Block<ChatNavBarProps> {
    static componentName: string = 'ChatNavBar';

    constructor() {
        super({ styles, icon: icons.ThreeDots });

        this.setProps({
            open: false,
            users: store.getState().chatUsers,
            onDelete: this.handleDeleteClick.bind(this),
            onAddUser: this.handleAddUserClick.bind(this),
            onOpen: this.handleOpen.bind(this),
            onClose: this.handleClose.bind(this),
        });

        store.on(StoreEvents.Updated, () => {
            this.setProps({
                users: store.getState().chatUsers,
                title: store.getState().selectedChatTitle as string
            });
        });
    }

    handleDeleteClick() {
        const chatId = store.getState().selectedChatId as number;
        ChatController.deleteChatById({ chatId });
    }

    handleAddUserClick(event: SubmitEvent) {
        event.preventDefault();
        const chatId = store.getState().selectedChatId as number;
        const userId = document.forms[1].userId.value;

        ChatController.addUsers({
            users: [userId],
            chatId,
        });
    }

    handleOpen() {
        this.setProps({ open: true });
    }

    handleClose() {
        this.setProps({ open: false });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.chat-nav-bar}}>
                <div>
                    {{{ IconView url="" alt="Иконка чата" }}}
                    <p>{{title}}</p>
                </div>
                <div>
                    {{{ Button title="Добавить пользователя" onClick=onOpen button=true  className=styles.add }}}
                    {{{ Button title="Удалить чат" button=true className=styles.remove onClick=onDelete }}}
                </div>
                <dialog class={{styles.modal-overlay}} open={{open}}>
                <div class={{styles.modal}}>
                    <div class={{styles.modal-header}}>
                        <h2>Список пользователей</h2>
                    </div>
                    <div class={{styles.modal-content}}>
                        <ul>
                            {{#each users}}
                                {{#with this}}
                                    {{{ UserItem id=id last_name=last_name first_name=first_name }}}
                                {{/with}}
                            {{/each}}
                        </ul>
                        <form class={{styles.add-user}} name="user">
                            {{{ Input type="number" name="userId" id="userId" label="Укажите ID пользователя" type="number" required=true }}}
                            {{{ Button title="Добавить" button=true onClick=onAddUser block=true }}}
                        </form>
                    </div>
                    <div class={{styles.modal-action}}>
                        {{{ Button title="Закрыть" button=true onClick=onClose block=true }}}
                    </div>
                </div>
            </dialog>
            </div>
        `;
    }
}

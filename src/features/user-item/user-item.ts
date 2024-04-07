import { Block } from '@/shared/utils';
import styles from './user-item.module.css';
import store from '@/shared/utils/store';
import { ChatController } from '@/shared/controllers';

type ExternalProps = {
    id?: number;
    first_name?: string;
    last_name?: string;
};

type UserItemProps = ExternalProps & {
    styles?: CSSModuleClasses;
    events?: {
        click?: () => void;
    };
};

export class UserItem extends Block<UserItemProps> {
    static componentName: string = 'UserItem';

    constructor(props: ExternalProps) {
        super({ styles, ...props });

        this.setProps({
            events: {
                click: this.handleDeleteClick.bind(this),
            },
        });
    }

    handleDeleteClick() {
        const userId = this.props.id as number;

        const chatId = store.getState().selectedChatId as number;

        ChatController.deleteUser({
            users: [userId],
            chatId,
        });
    }

    render() {
        // language=hbs
        return `
            <li class={{styles.user-item}}>
                <span>{{last_name}} {{first_name}}</span>
                <span class={{styles.close}}>×</span>
            </li>
        `;
    }
}

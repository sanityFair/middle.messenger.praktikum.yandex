import { Block } from '@/shared/utils';
import styles from './chat-nav-bar.module.css';
import { icons } from '@/shared/icons';

type ChatNavBarProps = {
    styles?: CSSModuleClasses;
    icon?: string;
};

export class ChatNavBar extends Block<ChatNavBarProps> {
    static componentName: string = 'ChatNavBar';

    constructor() {
        super({ styles, icon: icons.ThreeDots });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.chat-nav-bar}}>
                <div>
                    {{{ IconView url="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}}
                    <p>Иван</p>
                </div>
                {{{ IconButton icon=icon className=styles.more }}}
            </div>
    
        `;
    }
}

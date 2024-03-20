import { Block } from '@/shared/utils';
import styles from './backward.module.css';
import { icons } from '@/shared/icons';

type BackwardProps = {
    styles?: CSSModuleClasses;
    icon?: string;
};

export class Backward extends Block<BackwardProps> {
    static componentName: string = 'Backward';

    constructor() {
        super({ styles, icon: icons.ArrowBack });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.backward}}>
                <div page="chats" class={{styles.backward-wrapper-icon}}><img src={{icon}} alt="Вернуться" class={{styles.backward-icon}}></aside></div>
            </div>
        `;
    }
}

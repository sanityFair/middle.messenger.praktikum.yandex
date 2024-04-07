import { Block, router } from '@/shared/utils';
import styles from './backward.module.css';
import { icons } from '@/shared/icons';

type BackwardProps = {
    styles?: CSSModuleClasses;
    icon?: string;
    onRClick?: () => void;
};

export class Backward extends Block<BackwardProps> {
    static componentName: string = 'Backward';

    constructor() {
        super({ styles, icon: icons.ArrowBack });

        this.setProps({
            onRClick: () => router.go('/messenger'),
        });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.backward}}>
                {{{ IconButton  url=icon onClick=onRClick alt="Вернуться"  className=styles.backward-icon }}}
            </div>
            
        `;
    }
}

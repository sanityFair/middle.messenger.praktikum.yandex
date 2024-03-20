import { Block } from '@/shared/utils';
import styles from './icon-button.module.css';

type ExternalProps = {
    url: string;
    className?: string;
};

type IconButtonProps = ExternalProps & {
    styles?: CSSModuleClasses;
};

export class IconButton extends Block<IconButtonProps> {
    static componentName: string = 'IconButton';

    constructor({ url, className }: ExternalProps) {
        super({ styles, url, className });
    }

    render() {
        // language=hbs
        return `
            <button class='{{styles.icon-button}} {{className}}'>
                <img src={{url}}></img>
            </button>
        `;
    }
}

import { Block } from '@/shared/utils';
import styles from './icon-button.module.css';

type ExternalProps = {
    url: string;
    className?: string;
    alt?: string;
};

type IconButtonProps = ExternalProps & {
    styles?: CSSModuleClasses;
};

export class IconButton extends Block<IconButtonProps> {
    static componentName: string = 'IconButton';

    constructor({ url, className, alt = 'Иконка' }: ExternalProps) {
        super({ styles, url, className, alt });
    }

    render() {
        // language=hbs
        return `
            <button class='{{styles.icon-button}} {{className}}'>
                <img src={{url}} alt={{alt}}></img>
            </button>
        `;
    }
}

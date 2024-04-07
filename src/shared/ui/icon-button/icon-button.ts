import { Block } from '@/shared/utils';
import styles from './icon-button.module.css';

type ExternalProps = {
    url: string;
    className?: string;
    alt?: string;
    onClick?: () => void;
};

type IconButtonProps = ExternalProps & {
    styles?: CSSModuleClasses;
    events: {
        click?: () => void;
    };
};

export class IconButton extends Block<IconButtonProps> {
    static componentName: string = 'IconButton';

    constructor({ url, className, alt = 'Иконка', onClick }: ExternalProps) {
        super({ styles, url, className, alt, events: { click: onClick } });
    }

    render() {
        // language=hbs
        return `
            <button class='{{styles.icon-button}} {{className}}' onClick={{onClick}}>
                <img src={{url}} alt={{alt}}></img>
            </button>
        `;
    }
}

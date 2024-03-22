import { Block } from '@/shared/utils';
import styles from './button.module.css';

type ExternalProps = {
    title: string;
    styles?: Record<string, string>;
    button?: boolean;
    link?: boolean;
    block?: boolean;
    page?: string;
    onClick?: () => void;
};

type ButtonProps = ExternalProps & {
    styles: Record<string, string>;
    events: {
        click?: () => void;
    };
};

export class Button extends Block<ButtonProps> {
    static componentName: string = 'Button';

    constructor({ title, button, block, link, onClick = () => {}, page }: ExternalProps) {
        super({ title, styles, block, button, link, page, events: { click: onClick } });
    }

    protected render(): string {
        // language=hbs
        return `
        {{#if button}}
            <button
                class='{{styles.button}} {{#if block}} {{styles.block}} {{/if}} {{className}}'
                page={{page}}
                type={{type}}
                onClick={{onClick}}>
                {{title}}
            </button>
        {{/if}}
        {{#if link}}
            <a class='{{styles.link}} {{className}}'  page={{page}} role="button" onClick={{onClick}}>{{title}}</a>
        {{/if}}
        `;
    }
}

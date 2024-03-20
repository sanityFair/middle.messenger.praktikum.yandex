import { Block } from '@/shared/utils';
import styles from './message.module.css';

type ExternalProps = {
    owner?: boolean;
    mate?: boolean;
};

type MessageProps = ExternalProps & {
    styles?: CSSModuleClasses;
};

export class Message extends Block<MessageProps> {
    static componentName: string = 'Message';

    constructor({ owner, mate }: ExternalProps) {
        super({ styles, owner, mate });
    }
    protected render(): string {
        // language=hbs
        return `
        <div class='{{styles.message}} {{#if owner}} {{styles.owner}} {{/if}} {{#if mate}} {{styles.mate}} {{/if}}'>
            <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — 
                НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. 
                Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки 
                этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали 
                только кассеты с пленкой.
            </p>
            <time class={{styles.time}}>11:50</time>
        </div>
    `;
    }
}

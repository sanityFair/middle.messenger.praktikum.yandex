import { Block } from '@/shared/utils';
import styles from './message.module.css';
import store, { StoreEvents } from '@/shared/utils/store';

type MessageProps = {
    styles?: CSSModuleClasses;
    messages?: unknown;
};

export class Message extends Block<MessageProps> {
    static componentName: string = 'Message';

    constructor() {
        super({ styles });

        store.on(StoreEvents.Updated, () => {

            this.setProps({ messages: store.getState().messages });
        });
    }
    protected render(): string {
        // language=hbs

        return `
        <div class={{styles.root}}>
            {{#each messages}}
                {{#with this}}
                    <div class='{{@root.styles.message}} {{@root.styles.owner}}'>
                    <p>{{content}}</p>
                    <time class={{@root.styles.time}}>{{time}}</time>
                </div>
                {{/with}}
            {{/each}}
       </div>
    `;
    }
}

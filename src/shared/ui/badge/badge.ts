import { Block } from '@/shared/utils';
import styles from './badge.module.css';

type ExternalProps = {
    count?: number;
};

type BadgeProps = ExternalProps & {
    styles?: CSSModuleClasses;
};

export class Badge extends Block<BadgeProps> {
    static componentName: string = 'Badge';

    constructor({ count }: ExternalProps) {
        super({ styles, count });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.badge}} data-count={{count}}>
                {{count}}
            </div>
        `;
    }
}

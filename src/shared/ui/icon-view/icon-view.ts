import { Block } from '@/shared/utils';
import styles from './icon-view.module.css';

type ExternalProps = {
    url: string;
};

type IconViewProps = ExternalProps & {
    styles?: CSSModuleClasses;
};

export class IconView extends Block<IconViewProps> {
    static componentName: string = 'IconView';

    constructor({ url }: ExternalProps) {
        super({ styles, url });
    }

    render() {
        // language=hbs
        return `
            <img class={{ styles.icon-view }} src={{ url }}></img>
        `;
    }
}

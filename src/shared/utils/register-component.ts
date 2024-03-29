import { Block } from './block';
import Handlebars, { HelperOptions } from 'handlebars';

export interface BlockConstructable<Props extends Record<string, unknown>> {
    new (props: Props): Block<Props>;
    componentName: string;
}

export const registerComponent = <Props extends Record<string, unknown>>(
    Component: BlockConstructable<Props>,
) => {
    Handlebars.registerHelper(
        Component.componentName,
        function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
            if (!data.root.children) {
                data.root.children = {};
            }

            if (!data.root.refs) {
                data.root.refs = {};
            }

            const { children, refs } = data.root;

            (Object.keys(hash) as typeof hash).forEach((key: keyof Props) => {
                if (this[key] && typeof this[key] === 'string') {
                    hash[key] = hash[key].replace(
                        new RegExp(`{{` + key.toString() + `}}`, 'i'),
                        this[key],
                    );
                }
            });

            const component = new Component(hash);

            children[component.id] = component;

            if (ref) {
                refs[ref] = component.getContent();
            }

            const contents = fn ? fn(this) : '';

            return `<div data-id="${component.id}">${contents}</div>`;
        },
    );
};

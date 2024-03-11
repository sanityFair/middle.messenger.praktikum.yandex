import Handlebars from 'handlebars';

type Params<Data> = {
    template: string;
    context?: Data;
    containerId?: string;
    styles?: Record<string, string>;
};

export const renderTemplate = <T>({
    template,
    context,
    containerId,
    styles,
}: Params<T>): string | void => {
    const render = Handlebars.compile(template);

    const result = render({ ...context, styles });

    if (!containerId) return result;

    const root = document.querySelector(containerId);

    if (root) {
        root.innerHTML = result;
    }

    return;
};

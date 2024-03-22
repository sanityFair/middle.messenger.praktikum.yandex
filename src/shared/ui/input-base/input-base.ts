import { Block } from '@/shared/utils';

type ExternalInputBaseProps = {
    type: 'text' | 'password' | 'email' | 'file';
    name: string;
    placeholder?: string;
    value?: string;
    class?: string;
    id?: string;
    required?: boolean;
    onInput?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
};

type InputBaseProps = ExternalInputBaseProps & {
    events: {
        input?: () => void;
        focus?: () => void;
        blur?: () => void;
    };
};

export class InputBase extends Block<InputBaseProps> {
    static componentName: string = 'InputBase';

    constructor({
        onInput,
        onFocus,
        onBlur,
        class: string = 'input',
        type,
        value,
        name,
        id,
        required,
        placeholder,
    }: ExternalInputBaseProps) {
        super({
            class: string,
            type,
            value,
            name,
            id,
            placeholder,
            required,
            events: {
                input: onInput,
                focus: onFocus,
                blur: onBlur,
            },
        });
    }

    protected render(): string {
        // language=hbs
        return `
            <input
                type='{{type}}'
                placeholder='{{placeholder}}'
                value='{{value}}' 
                name='{{name}}'
                id='{{id}}'
                {{#if required}}required{{/if}}
            />
     `;
    }
}

import { Block } from '@/shared/utils';

type ExternalInputBaseProps = {
    type: 'text' | 'password' | 'email' | 'file';
    inputName: string;
    placeholder?: string;
    value?: string;
    class?: string;
    id?: string;
    required?:boolean;
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
        inputName,
        id,
        required,
        placeholder,
    }: ExternalInputBaseProps) {
        super({
            class: string,
            type,
            value,
            inputName,
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
                name='{{inputName}}'
                id='{{id}}'
                {{#if required}}required{{/if}}
            />
     `;
    }
}

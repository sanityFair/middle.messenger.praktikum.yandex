import { Block, stringToPascalCase, validateForm } from '@/shared/utils';
import styles from './input.module.css';
import { FieldType } from '@/shared/constants';

type InputIncomingProps = {
    type: 'text' | 'password' | 'email' | 'file';
    inputName: string;
    placeholder?: string;
    label?: string;
    value?: string;
    required?: boolean;
    className?: string;

    styles?: Record<string, string>;
    id?: string;
    onInputEvent?: (e: FocusEvent) => void;
    onFocus?: () => void;
    onBlur?: () => void;
};

export type InputProps = InputIncomingProps & {
    errorMessage?: string;
    error?: boolean;
    events?: {
        input?: () => void;
        focus?: () => void;
        blur?: () => void;
    };
};

export class Input extends Block<InputProps> {
    static componentName: string = 'Input';

    constructor({
        className,
        label,
        type,
        value,
        inputName,
        id,
        required,
        placeholder,
    }: InputIncomingProps) {
        super({
            className,
            required,
            type,
            error: false,
            label,
            styles,
            value,
            inputName,
            id,
            placeholder,
            onInputEvent: (event: FocusEvent) => {
                const target = event.target as HTMLInputElement;
                const nameInPascalCase = stringToPascalCase(inputName);
                const error = validateForm([
                    { name: nameInPascalCase as FieldType, input: target },
                ])[nameInPascalCase];

                if (error) {
                    this.setProps({
                        ...this.getProps(),
                        error: true,
                        errorMessage: error,
                        value: target.value,
                    });
                } else {
                    this.setProps({
                        ...this.getProps(),
                        error: false,
                        errorMessage: '',
                        value: target.value,
                    });
                }
            },
        });
    }

    protected render(): string {
        // language=hbs

        return `
            <fieldset class="{{styles.field}} {{className}}">
                {{{ InputBase inputName=inputName type=type onBlur=onInputEvent value=value ref=childInputRef placeholder=placeholder id=id required=required }}}
                <hr />
                <label>{{label}}</label>
                {{#if error}}<div class={{styles.error}}>{{errorMessage}}</div>{{/if}}
            </fieldset>
       `;
    }
}

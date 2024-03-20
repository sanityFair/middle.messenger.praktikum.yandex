import {
    ALL_DIGITS,
    EMAIL_CHARACTERS,
    FIRST_CAPITAL_LETTER,
    LATIN_LETTERS,
    NO_DIGITS,
    ONE_CAPITAL_LETTER,
    ONE_DIGIT,
    ONE_SPACE_SYMBOL,
    ONLY_LETTERS_AND_DASH,
    PHONE_SYMBOLS,
    SPECIAL_CHARACTERS,
    FieldType,
} from '@/shared/constants';
import { lowerCaseFirstLetter } from './string-format';

export type ValidateRule = {
    name: FieldType;
    input: HTMLInputElement;
};

export const validateForm = (rulesArray: ValidateRule[]) => {
    const errors: Record<string, string> = {};

    rulesArray.forEach((rule) => {
        const { name, input } = rule;
        const { value } = input;

        switch (lowerCaseFirstLetter(name)) {
            case FieldType.Login:
                if (!value.length) {
                    errors[name] = 'Логин не может быть пустым';
                    return;
                }

                if (value.length > 20 || value.length < 3) {
                    errors[name] = 'Логин должен содержать от 3 до 20 символов';
                    return;
                }

                if (value.match(ALL_DIGITS)) {
                    errors[name] = 'Для входа используйте только латинские буквы';
                    return;
                }

                if (!value.match(LATIN_LETTERS)) {
                    errors[name] = 'Для входа используйте только латинские буквы';
                    return;
                }

                if (!value.match(ONE_SPACE_SYMBOL)) {
                    errors[name] = 'Логин не должен содержать пробелов';
                    return;
                }

                if (value.match(SPECIAL_CHARACTERS)) {
                    errors[name] = 'Пароль не может быть пустым';
                    return;
                }

                break;

            case FieldType.Password:
            case FieldType.NewPassword:
            case FieldType.OldPassword:
                if (!value.length) {
                    errors[name] = 'Пароль не может быть пустым';
                    return;
                }

                if (value.length > 40 || value.length < 8) {
                    errors[name] = 'Пароль должен содержать хотя бы одну заглавную букву';
                    return;
                }

                if (!value.match(ONE_CAPITAL_LETTER)) {
                    errors[name] = 'Пароль должен содержать хотя бы одну заглавную букву';
                    return;
                }

                if (!value.match(ONE_DIGIT)) {
                    errors[name] = 'Пароль должен содержать хотя бы одну цифру';
                    return;
                }

                break;

            case FieldType.Email:
                if (!value.length) {
                    errors[name] = 'Электронная почта не может быть пустой';
                    return;
                }

                if (!value.match(EMAIL_CHARACTERS)) {
                    errors[name] = 'Неверный адрес электронной почты';
                    return;
                }

                break;

            case FieldType.Phone:
                if (!value.length) {
                    errors[name] = 'Телефон не может быть пустым';
                    return;
                }

                if (!value.match(NO_DIGITS)) {
                    errors[name] = 'Номер телефона не должен содержать букв';
                    return;
                }

                if (!value.match(PHONE_SYMBOLS)) {
                    errors[name] = 'Неправильный номер телефона';
                    return;
                }

                break;

            case FieldType.FirstName:
            case FieldType.SecondName:
                if (!value.length) {
                    errors[name] = 'Имя не может быть пустым';
                    return;
                }

                if (!value.match(ONLY_LETTERS_AND_DASH)) {
                    errors[name] = 'Имя должно содержать только буквы и тире';
                    return;
                }

                if (!value.match(FIRST_CAPITAL_LETTER)) {
                    errors[name] = 'Имя должно начинаться с заглавной буквы';
                    return;
                }

                break;

            case FieldType.Message:
                if (!value.length) {
                    errors[name] = 'Необходимо ввести сообщение';
                    return;
                }

                break;

            default:
                errors[name] = 'Некорректный ввод';
        }
    });

    return errors;
};

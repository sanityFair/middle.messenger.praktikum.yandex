import { Block } from '@/shared/utils';
import styles from './personal-information.module.css';

type PersonalInformationProps = {
    styles?: CSSModuleClasses;
};

export class PersonalInformation extends Block<PersonalInformationProps> {
    static componentName: string = 'PersonalInformation';

    constructor() {
        super({ styles });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.personal-information}}>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Почта</p>
                    <p class={{styles.value}}>{{email}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Логин</p>
                    <p class={{styles.value}}>{{login}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Имя</p>
                    <p class={{styles.value}}>{{second_name}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Фамилия</p>
                    <p class={{styles.value}}>{{first_name}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Имя в чате</p>
                    <p class={{styles.value}}>{{display_name}}</p>
                </div>
                <div class={{styles.personal-item}}>
                    <p class={{styles.name}}>Телефон</p>
                    <p class={{styles.value}}>{{phone}}</p>
                </div>
                <div class={{styles.personal-spacer}}></div>
                <div class={{styles.personal-action}}>
                    <a  page="сhangeProfilePage" class={{styles.change-info}}>Изменить данные</a>
                </div>
                <div class={{styles.personal-action}}>
                    <a  page="сhangePasswordPage" class={{styles.change-password}} >Изменить пароль</a>
                </div>
                <div class={{styles.personal-action}}>
                    <a page="login" class={{styles.exit}} >Выйти</a>
                </div>
            </div>    
        `;
    }
}

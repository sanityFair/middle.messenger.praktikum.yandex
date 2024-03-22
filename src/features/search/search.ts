import { Block } from '@/shared/utils';
import { icons } from '@/shared/icons';
import styles from './search.module.css';

type SearchProps = {
    styles?: CSSModuleClasses;
    icon?: string;
};

export class Search extends Block<SearchProps> {
    static componentName: string = 'Search';

    constructor() {
        super({ styles, icon: icons.Search });
    }

    render() {
        // language=hbs
        return `
            <div class={{styles.search}}>
                <img class="{{styles.icon-search}}" src={{icon}} alt="Иконка поиска"></img>
                <input placeholder="Поиск" name="search" >
            </div>
        `;
    }
}

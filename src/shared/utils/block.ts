import { v4 as uuidv4 } from 'uuid';
import { EVENTS } from '../constants';
import { EventBus } from './event-bus';

import Handlebars from 'handlebars';
import { isEqual } from './is-equal';
import { Indexed } from '../types';

export class Block<P = Record<string, unknown>> {
    static componentName: string;

    public id = uuidv4();

    protected _element: HTMLElement | null = null;
    protected readonly props: Partial<P>;
    protected children: { [id: string]: Block<Record<string, unknown>> } = {};
    private _eventBus: EventBus;

    constructor(props?: P) {
        this._eventBus = new EventBus();
        this.props = this._makePropsProxy(props || ({} as P));

        this._registerEvents();

        this._eventBus.emit(EVENTS.INIT, this.props);
    }

    private _registerEvents() {
        this._eventBus.on(EVENTS.INIT, this.init.bind(this));
        this._eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._eventBus.emit(EVENTS.FLOW_RENDER, this.props);
    }

    private _componentDidMount(props: P) {
        this.componentDidMount(props);
    }

    componentDidMount(props: P) {
        this.setProps(props);
        return true;
    }

    dispatchComponentDidMount() {
        this._eventBus.emit(EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: Indexed, newProps: Indexed) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: Indexed, newProps: Indexed) {
        return isEqual(oldProps, newProps);
    }

    setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    getProps = () => {
        return this.props;
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this._compile();
        const newElement = fragment.firstElementChild!;

        if (this._element) {
            this._removeEvents();
            this._element!.replaceWith(newElement);
        }

        this._element = newElement as HTMLElement;
        this._addEvents();
    }

    protected render(): string {
        return '';
    }

    getContent(): HTMLElement {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this._eventBus.emit(EVENTS.FLOW_CDM);
                }
            }, 100);
        }

        return this.element!;
    }

    private _makePropsProxy<P extends typeof this.props>(props: P) {
        const self = this;
        return new Proxy(props as unknown as object, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },

            set(target: Record<string, unknown>, prop: string, value: unknown) {
                target[prop] = value;
                self._eventBus.emit(EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },

            deleteProperty() {
                throw new Error('Нет доступа');
            },
        }) as unknown as P;
    }

    private _removeEvents() {
        const events = (this.props as Record<string, unknown>).events;

        if (!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        });
    }

    private _addEvents() {
        const events = (this.props as Record<string, unknown>).events;

        if (!events) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        });
    }

    private _compile(): DocumentFragment {
        const fragment = document.createElement('template');

        /**
         * Рендерим шаблон
         */
        const template = Handlebars.compile(this.render());

        fragment.innerHTML = template({
            ...this.props,
            children: this.children,
        });

        /**
         * Заменяем заглушки на компоненты
         */
        Object.entries(this.children).forEach(([id, component]) => {
            /**
             * Ищем заглушку по id
             */
            const stub = fragment.content.querySelector(`[data-id="${id}"]`);

            if (!stub) {
                return;
            }
            /**
             * Заменяем заглушку на component._element
             */
            const content = component.getContent();
            stub.replaceWith(content);
        });

        /**
         * Возвращаем фрагмент
         */
        return fragment.content;
    }

    show() {
        this.getContent().style.display = '';
    }

    hide() {
        this.getContent().style.display = 'none';
    }
}

import { Indexed } from '../types';
import { EventBus } from './event-bus';
import { set } from './set';

export enum StoreEvents {
    Updated = 'updated',
}

const initialState = {
    isAuth: false,
    selectedChatId: null,
    selectedChat: false,
    selectedChatTitle: '',
    chatUsers: [],
    user: {},
    chats: [],
    token: '',
    messages: [],
};

class Store extends EventBus {
    private state: Indexed = {};

    constructor(state: Indexed) {
        super();
        this.state = state;
        this.listeners[StoreEvents.Updated] = [];
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    }

    public getState() {
        return this.state;
    }

    public resetState() {
        this.state = initialState;
    }
}

export default new Store(initialState);

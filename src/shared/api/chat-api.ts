import { CreateChatRequest, DeleteChatRequest, UsersRequest } from '../types';
import { BaseApi } from './base-api';

class ChatApi extends BaseApi {
    constructor() {
        super('/chats');
    }

    getChats() {
        return this.http.get('/');
    }

    getChatUsers(id: string) {
        return this.http.get('/{id}/users'.replace('{id}', id));
    }

    addUsers(data: UsersRequest) {
        return this.http.put('/users', { data, headers: { 'content-type': 'application/json' } });
    }

    deleteUser(data: UsersRequest) {
        return this.http.delete('/users', {
            data,
            headers: { 'content-type': 'application/json' },
        });
    }

    createChat(data: CreateChatRequest) {
        return this.http.post('/', { data, headers: { 'content-type': 'application/json' } });
    }

    deleteChatById(data: DeleteChatRequest) {
        return this.http.delete('/', { data, headers: { 'content-type': 'application/json' } });
    }

    getChatToken(id: string) {
        return this.http.post('/token/'.concat(id), {
            headers: { 'content-type': 'application/json' },
        });
    }
}

export const chatApi = new ChatApi();

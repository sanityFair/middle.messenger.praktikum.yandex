import { chatApi } from '../api';
import { CreateChatRequest, DeleteChatRequest, User, UsersRequest } from '../types';
import store from '../utils/store';
import { AuthController } from './auth-controller';

export class ChatController {
    static async createChat(data: CreateChatRequest) {
        try {
            const response = await chatApi.createChat(data);

            if (response.status === 401) {
                AuthController.logout();
                return;
            }

            await ChatController.getChats();
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteChatById(data: DeleteChatRequest) {
        try {
            await chatApi.deleteChatById(data);
            store.set('selectedChatId', null);
            store.set('token', '');
            await ChatController.getChats();
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
        }
    }

    static async getChats() {
        try {
            const response = await chatApi.getChats();
            store.set('chats', JSON.parse(response.responseText));
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
        }
    }

    static async getChatUsers(id: string) {
        try {
            const response = await chatApi.getChatUsers(id);
            store.set('chatUsers', JSON.parse(response.responseText));
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
        }
    }

    static async addUsers(data: UsersRequest) {
        try {
            await chatApi.addUsers(data);
            await ChatController.getChatUsers(`${data.chatId}`);
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
        }
    }

    static async deleteUser(data: UsersRequest) {
        try {
            await chatApi.deleteUser(data);
            await ChatController.getChatUsers(`${data.chatId}`);
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
        }
    }

    static async getChatToken() {
        try {
            const chatId = store.getState().selectedChatId as string;

            if (!chatId) return;

            const response = await chatApi.getChatToken(chatId);
            store.set('token', JSON.parse(response.responseText).token);

            await ChatController.connectChat();
        } catch (error) {
            store.set('isAuth', false);
            store.set('user', {});
        }
    }

    static connectChat() {
        try {
            const chatId = store.getState().selectedChatId as string;
            const userId = (store.getState().user as User).id;
            const token = store.getState().token;

            const socket = new WebSocket(
                `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
            );

            socket.addEventListener('open', () => {
                console.log('Соединение установлено');

                setInterval(() => {
                    socket.send(
                        JSON.stringify({
                            type: 'ping',
                        }),
                    );
                }, 1000);

                socket.send(
                    JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }),
                );
            });

            socket.addEventListener('close', (event) => {
                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }

                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            socket.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);

                if (data instanceof Array) {
                    store.set('chats', data);
                } else {
                    socket.send(
                        JSON.stringify({
                            content: '0',
                            type: 'get old',
                        }),
                    );
                }
            });

            socket.addEventListener('error', (event) => {
                console.log('Ошибка', event);
            });

            return socket;
        } catch (error) {
            console.log(error);
        }
    }
}

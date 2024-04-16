import { chatApi } from '../api';
import { CreateChatRequest, DeleteChatRequest, User, UsersRequest } from '../types';
import store from '../utils/store';
import { AuthController } from './auth-controller';

export class ChatController {
    static wss?: WebSocket;
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
            ChatController.getChatUsers(`${data.chatId}`);
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

            ChatController.wss = ChatController.connectChat();
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

            if (!chatId || !userId || !token ) {
                return;
            }

            ChatController.wss = new WebSocket(
                `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
            );

            ChatController.wss.addEventListener('open', () => {
                console.log('Соединение установлено');

                setInterval(() => {
                    ChatController.wss?.send(
                        JSON.stringify({
                            type: 'ping',
                        }),
                    );
                }, 1000);

                ChatController.wss?.send(
                    JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }),
                );
            });

            ChatController.wss.addEventListener('close', (event) => {
                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }

                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            ChatController.wss.addEventListener('error', (event) => {
                console.log('Ошибка', event);
            });

            ChatController.wss.addEventListener('message', (event) => {
                const messages = JSON.parse(event.data);

                if (messages instanceof Array) {

                    store.set('messages', [...messages]);
                } else {
                    const msg = JSON.parse(event.data);

                    if (msg.type === 'message') {
                        const prev = store.getState().messages as unknown[];
                        store.set('messages', [msg, ...prev]);
                    }
                }
            });

            return ChatController.wss;
        } catch (error) {
            console.log(error);
        }
    }
}

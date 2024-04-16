export type CreateChatRequest = {
    title: string;
};

export type DeleteChatRequest = {
    chatId: number;
};

export type ChatQuery = {
    offset?: number;
    limit?: number;
    title?: string;
};

export type UsersRequest = {
    users: number[];
    chatId: number;
};

import { Block } from '../utils';

export type RefsObject = Record<string, HTMLInputElement>;

export type ChatRoom = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: LastMessage;
};

export type LastMessage = {
    user: User;
    time: string;
    content: string;
};

export type User = {
    id?:number;
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
};

export type Indexed<T = unknown> = {
    [key in string]: T;
};

export interface BlockClass<P> extends Function {
    new (props: P): Block<P>;
}

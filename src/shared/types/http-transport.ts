import { METHODS } from '../constants';

export type Options<TData> = {
    method: METHODS;
    data?: TData;
    headers?: { [key: string]: string };
    timeout?: number;
};

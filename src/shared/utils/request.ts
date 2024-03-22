import { queryStringify } from '.';
import { METHODS } from '../constants';
import { Options } from '../types/http-transport';

export const request = <TData>(
    url: string,
    options: Options<TData>,
    timeout: number = 5000,
): Promise<XMLHttpRequest> => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url.concat(queryStringify(data ?? {})));
        xhr.timeout = timeout;

        if (headers) {
            Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
        }

        xhr.onload = () => (xhr.status >= 400 ? reject(xhr) : resolve(xhr));

        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;

        if (method === METHODS.GET || !data) {
            xhr.send();
        } else {
            xhr.send(JSON.stringify(data));
        }
    });
};

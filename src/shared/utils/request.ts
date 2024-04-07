import { METHODS } from '../constants';
import { Options } from '../types/http-transport';
import { queryString } from './get-params';

export const request = <TData>(
    url: string,
    options: Options<TData>,
    timeout: number = 5000,
): Promise<XMLHttpRequest> => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const params = method === 'GET' && data ? '?'.concat(queryString(data)) : '';

        xhr.open(method, url.concat(params));
        xhr.timeout = timeout;

        if (headers) {
            Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
        }

        xhr.onload = () => (xhr.status >= 400 ? reject(xhr) : resolve(xhr));

        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;
        xhr.withCredentials = true;

        if (data instanceof FormData) {
            xhr.send(data);
        } else if (method === METHODS.GET || !data) {
            xhr.send();
        } else {
            xhr.send(JSON.stringify(data));
        }
    });
};

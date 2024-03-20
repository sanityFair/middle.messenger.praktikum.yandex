import { METHODS } from '@/shared/constants';
import { Options } from '@/shared/types';
import { request } from './request';

class HTTPTransport {
    get<T>(url: string, options: Options<T>) {
        return request(url, { ...options, method: METHODS.GET }, options?.timeout);
    }

    post<T>(url: string, options: Options<T>) {
        return request(url, { ...options, method: METHODS.POST }, options?.timeout);
    }

    put<T>(url: string, options: Options<T>) {
        return request(url, { ...options, method: METHODS.PUT }, options?.timeout);
    }

    delete<T>(url: string, options: Options<T>) {
        return request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    }
}

export default new HTTPTransport();

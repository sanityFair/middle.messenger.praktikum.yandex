import { METHODS } from '@/shared/constants';
import { Options } from '@/shared/types';
import { request } from './request';

export class HTTPTransport {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }

    get<T>(url: string, options?: Omit<Options<T>, 'method'>) {
        return request(
            this.baseUrl.concat(url),
            { ...options, method: METHODS.GET },
            options?.timeout,
        );
    }

    post<T>(url: string, options?: Omit<Options<T>, 'method'>) {
        return request(
            this.baseUrl.concat(url),
            { ...options, method: METHODS.POST },
            options?.timeout,
        );
    }

    put<T>(url: string, options?: Omit<Options<T>, 'method'>) {
        return request(
            this.baseUrl.concat(url),
            { ...options, method: METHODS.PUT },
            options?.timeout,
        );
    }

    delete<T>(url: string, options?: Omit<Options<T>, 'method'>) {
        return request(
            this.baseUrl.concat(url),
            { ...options, method: METHODS.DELETE },
            options?.timeout,
        );
    }
}

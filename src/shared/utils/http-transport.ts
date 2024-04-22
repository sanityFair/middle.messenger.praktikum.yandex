import { METHODS } from '../../shared/constants';
import { Options } from '../../shared/types';
import { request } from './request';

type HTTPMethod = <T = unknown>(
    url: string,
    options?: Omit<Options<T>, 'method'>,
) => Promise<XMLHttpRequest>;

export class HTTPTransport {
    public baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }

    get: HTTPMethod = (url: string, options = {}) => {
        return request(
            this.baseUrl.concat(url),
            { ...options, method: METHODS.GET },
            options?.timeout,
        );
    };

    post: HTTPMethod = (url: string, options = {}) => {
        return request(
            this.baseUrl.concat(url),
            { ...options, method: METHODS.POST },
            options?.timeout,
        );
    };

    put: HTTPMethod = (url: string, options = {}) => {
        return request(
            this.baseUrl.concat(url),
            { ...options, method: METHODS.PUT },
            options?.timeout,
        );
    };

    delete: HTTPMethod = (url: string, options = {}) => {
        return request(
            this.baseUrl.concat(url),
            { ...options, method: METHODS.DELETE },
            options?.timeout,
        );
    };
}

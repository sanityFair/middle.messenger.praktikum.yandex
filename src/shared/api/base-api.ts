import { URLS } from '../constants';
import { HTTPTransport } from '../utils';

export class BaseApi {
    protected http: HTTPTransport;

    constructor(baseUrl: string = '') {
        this.http = new HTTPTransport(URLS.BASE.concat(baseUrl));
    }
}

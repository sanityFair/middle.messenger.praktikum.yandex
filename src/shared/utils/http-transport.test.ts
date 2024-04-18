import { afterEach, beforeEach, describe } from 'mocha';
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './http-transport';

describe('HTTP Transport test', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];
    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        global.XMLHttpRequest = xhr;

        xhr.onCreate = (req) => {
            requests.push(req);
        };

        instance = new HTTPTransport('');
    });

    afterEach(() => {
        requests.length = 0;
        xhr.restore();
    });

    describe('HTTP Transport methods functionality', () => {
        it('should invoke get() method', () => {
            instance.get('/');

            const [request] = requests;

            expect(request.method).to.equal('GET');
        });

        it('should invoke post() method', () => {
            instance.post('/');

            const [request] = requests;

            expect(request.method).to.equal('POST');
        });

        it('should invoke put() method', () => {
            instance.put('/');

            const [request] = requests;

            expect(request.method).to.equal('PUT');
        });

        it('should invoke delete() method', () => {
            instance.delete('/');

            const [request] = requests;

            expect(request.method).to.equal('DELETE');
        });
    });
});

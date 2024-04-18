import { expect } from 'chai';
import { router } from './router';
import { JSDOM } from 'jsdom';
import { Block } from './block';

class TestComponent_1 extends Block {
    constructor() {
        super();
    }
    render() {
        return `<div id='page-1'>Page#1</div>`;
    }
}

class TestComponent_2 extends Block {
    constructor() {
        super();
    }
    render() {
        return `<div id='page-2'>Page#2</div>`;
    }
}

describe('Router', () => {
    beforeEach(() => {
        const { window } = new JSDOM('<!DOCTYPE html><body><main id="app"></main></body>', {
            url: 'http://localhost:3000',
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).window = window;
        global.document = window.document;
    });

    it('should there be an element', () => {
        router.use('/', TestComponent_1).start();

        expect(document.querySelector('#page-1')?.textContent).to.equal('Page#1');
    });

    it('should go to right path', () => {
        router.use('/', TestComponent_1).use('/2', TestComponent_2).start();
        router.go('/2');

        expect(document.querySelector('#page-2')?.textContent).to.equal('Page#2');
    });
});

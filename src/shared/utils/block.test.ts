import { expect } from 'chai';
import { Block } from './block';

interface Props {
    text: string;
}

class TestBlock extends Block<Props> {
    constructor({ text }: Props) {
        super({ text });
    }

    render() {
        return `<div>{{ text }}</div>`;
    }
}

describe('Block', () => {
    const component = new TestBlock({ text: 'Test text' });
    const text = component.getContent()?.innerHTML;

    it('should render new component', () => {
        expect(text).to.equal('Test text');
    });
});

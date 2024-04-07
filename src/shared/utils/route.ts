import { renderDOM } from './render-dom';
import { Block } from './block';
import { BlockClass } from '../types';

export class Route {
    private pathname: string;
    private blockClass: BlockClass<unknown>;
    private block: Block | null = null;
    private props: Record<string, unknown>;

    constructor(pathname: string, view: BlockClass<unknown>, props: Record<string, unknown>) {
        this.pathname = pathname;
        this.blockClass = view;
        this.props = props;
        this.block = null;
    }
    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.render();
        }
    }

    leave() {
        if (this.block) {
            this.block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this.pathname;
    }

    render() {
        if (!this.block) {
            this.block = new this.blockClass({ ...this.props });
            renderDOM(this.block);
            return;
        }

        renderDOM(this.block);
        this.block.show();
    }
}

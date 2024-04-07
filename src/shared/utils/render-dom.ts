import { Block } from './block';

export const renderDOM = (block: Block) => {
    const root = document.querySelector('#app');

    if (root) {
        root.innerHTML = '';
        root.appendChild(block.getContent());
    }
};

import { Indexed } from '../types';

export const isEqual = (a: Indexed, b: Indexed): boolean => {
    for (const key in a) {
        if (!(key in b)) return false;

        if (typeof b[key] === 'object') return isEqual(a[key] as Indexed, b[key] as Indexed);

        if (a[key] !== b[key]) return false;
    }

    return true;
};

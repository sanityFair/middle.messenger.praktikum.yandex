import { Indexed } from '../types';

export const set = (object: Indexed, path: string, value: unknown) => {
    if (typeof path !== 'string') throw new Error('path must be string');

    if (typeof object !== 'object') return object;

    const keys = path.split('.');
    let result = object;

    while (keys.length) {
        const key = keys.shift() as keyof typeof result;

        if (keys.length === 0) {
            result[key] = value;
        } else {
            if (!result[key]) {
                result[key] = {};
            }

            result = result[key] as Indexed;
        }
    }

    return object;
};

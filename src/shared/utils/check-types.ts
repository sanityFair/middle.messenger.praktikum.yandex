import { Indexed } from '../types';

export function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

export function isPlainObject(value: unknown): value is Indexed {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}

export function isArrayOrObject(value: unknown): value is [] | Indexed {
    return isPlainObject(value) || isArray(value);
}

export const cloneDeep = <T extends object = object>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => cloneDeep(item)) as unknown as T;
    }

    const clonedObj: Indexed = {};
    for (const key in obj) {
        if (key in obj) {
            clonedObj[key] = cloneDeep(obj[key] as unknown as T);
        }
    }

    return clonedObj as T;
};

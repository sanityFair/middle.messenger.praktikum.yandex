import { Block } from '.';
import { Input } from '@/shared/ui';

type RefsObject<T extends Record<string, unknown>> = {
    [id: string]: Block<T>;
};

export const hasErrorForm = <T extends Record<string, unknown>>(refs: RefsObject<T>) => {
    return Object.entries(refs)
        .filter(([_key, component]) => component instanceof Input)
        .some(([_, input]) => input.getProps().error);
};

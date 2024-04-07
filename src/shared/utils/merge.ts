import { Indexed } from '../types';

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
    const result = { ...lhs };

    for (const key in rhs) {
        if (key in rhs) {
            const rhsTemp = rhs[key];
            const lhsTemp = lhs[key];

            if (
                typeof rhsTemp === 'object' &&
                !Array.isArray(rhsTemp) &&
                typeof lhsTemp === 'object' &&
                !Array.isArray(lhsTemp)
            ) {
                result[key] = merge(lhsTemp as Indexed, rhsTemp as Indexed);
            } else {
                result[key] = rhs[key];
            }
        }
    }

    return result;
};

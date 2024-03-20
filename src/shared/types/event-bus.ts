/* eslint-disable @typescript-eslint/no-explicit-any */

export type CallBack<T extends unknown[] = any[]> = (...args: T) => void;

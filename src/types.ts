export type BigIntString = string;

export type CacheWrapper = <T>(fn: () => Promise<T>, keys: string[]) => Promise<T>;

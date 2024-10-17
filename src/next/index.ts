import { unstable_cache } from "next/cache";

export function createCacheWrapper(revalidate: number): <T>(fn: () => Promise<T>, keys: string[]) => Promise<T> {
  return async function <T>(fn: () => Promise<T>, keys: string[]): Promise<T> {
    return await unstable_cache(fn, keys, { revalidate })();
  };
}

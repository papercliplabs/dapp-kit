import { CacheWrapper } from "./types";

export async function fetchWithOptionalCache<T>(fn: () => Promise<T>, keys: string[], cacheWrapper?: CacheWrapper) {
  return await (cacheWrapper ? cacheWrapper(fn, keys) : fn());
}

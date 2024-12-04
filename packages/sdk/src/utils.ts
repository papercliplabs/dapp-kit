import { unstable_cache } from "next/cache";

export async function safeFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      if (response.status === 429) {
        // Rate limited
        throw Error(`HTTP error: ${url} - Rate limited`);
      } else {
        throw Error(`HTTP error: ${url} - ${response.status}, ${response.statusText}`);
      }
    }

    // Parse the response as JSON
    const data: T = await response.json();
    return data;
  } catch (error) {
    // Catch any network errors or exceptions thrown by fetch
    throw Error(`Network error: ${url} - ${error}`);
  }
}

// cb should throw error on failure which ensures we don't cache that and will retry
type Callback = (...args: any[]) => Promise<any>;
export function safeUnstableCache<T extends Callback>(
  cb: T,
  keyParts?: string[],
  options?: {
    revalidate?: number | false;
    tags?: string[];
  },
  retries?: number // Exponential backoff
) {
  return async function (...args: Parameters<T>) {
    const maxRetries = retries ?? 5;

    let retryCount = 0;
    while (retryCount < maxRetries) {
      try {
        return await unstable_cache(cb, keyParts, options)(...args);
      } catch (e) {
        console.error(`safeUnstableCache error ${e}`);
      }

      retryCount++;
      await delay(500 * retryCount + Math.random() * 1000); // Exponential backoff, with staggering retries
    }

    return null;
  } as (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | null>;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

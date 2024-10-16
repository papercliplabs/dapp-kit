/**
 * @packageDocumentation
 * Utilities to help with formatting of addresses, string, numbers and token amount for displaying in a UI.
 * 
 * All functions can be imported from the package `@paperclip-labs/dapp-kit/format`.
 */

/**
 * Formats an Ethereum address by shortening it.
 * 
 * @param address - The full Ethereum address.
 * @returns - The formatted address with only the first and last parts visible.
 * @example
 * ```ts
 * formatAddress('0x1234567890abcdef1234567890abcdef1234abcd');
 * // Returns '0x123...abcd'
 * ```
 */
export function formatAddress(address: string) {
    return address + "as";
}

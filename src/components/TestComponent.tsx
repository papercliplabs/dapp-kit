import { formatAddress } from "../format"

/**
 * Props for the `TestComponent` :).
 *
 * @property [input] - An optional Ethereum address string that will be formatted. If not provided, the default value `"0x"` will be used.
 */
export interface TestComponentProps {
    input?: string;
}

/**
 * Formats an Ethereum address by shortening it.
 * 
 * @param props - The component props containing an optional input.
 * @example
 * // Returns '0x123...abcd'
 * formatAddress('0x1234567890abcdef1234567890abcdef1234abcd');
 */
export function TestComponent({input}: TestComponentProps) {
    return <div>TESTss {formatAddress("0x")} {input}</div>
}

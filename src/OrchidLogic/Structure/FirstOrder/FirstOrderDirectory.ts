import { Structure } from "../Structure";
import { SetDefinition } from "./SetDefinition";

/**
 * Map from first order structure
 * character sequences to their prototypes
 */
export const firstOrderMap = new Map<string, typeof Structure>([
    ['set', SetDefinition]
]);


/**
 * Check if a character sequence corresponds to
 * a first order structure
 */
export function isSequenceFirstOrder(seq: string) {
    return firstOrderMap.has(seq);
}
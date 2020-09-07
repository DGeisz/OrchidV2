import { Term } from "./Term";

/**
 * This is a term that represents a
 * map
 */
export class MapTerm extends Term {
    isMap(): boolean {
        return true;
    }
}
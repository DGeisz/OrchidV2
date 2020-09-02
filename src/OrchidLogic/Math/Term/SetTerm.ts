import { Term } from "./Term";

/**
 * This is a term that represents a set,
 * and therefore contains a reference to the
 * abstract set it references
 */
export class SetTerm extends Term {
    isSet(): boolean {
        return true;
    }
}

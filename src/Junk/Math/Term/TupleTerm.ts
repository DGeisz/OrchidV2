import { Term } from "./Term";

/**
 * This is a term that is an element of
 * a cartesian product
 */
export class TupleTerm extends Term {
    isTuple(): boolean {
        return true;
    }
}
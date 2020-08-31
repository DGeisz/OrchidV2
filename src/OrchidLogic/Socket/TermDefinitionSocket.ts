import { Socket } from "./Socket";
import { Structure } from "../Structure/Structure";


/**
 * A term definition houses a new term,
 * so the structure it houses is a TermStructure.
 * Input is valid if the particular character sequence
 * hasn't been used for a term before
 */
export class TermDefinitionSocket extends Socket {
    constructor(domParentId: string, parentStructure: Structure) {
        super(domParentId);
        this.setParentStructure(parentStructure);
    }
}
import { Socket } from "./Socket";
import { firstOrderMap, isSequenceFirstOrder } from "../Structure/FirstOrder/FirstOrderDirectory";

/**
 * Represents a single line in the editor.  Can
 * hold a definition, an equality, a relationship,
 * or something of that nature
 */
export class LineSocket extends Socket {

    private index: number;

    constructor(domParentId: string, index: number) {
        super(domParentId);
        this.index = index;
    }

    isValidSequence(seq: string): boolean {
        return isSequenceFirstOrder(seq);
    }

    commitSequence(seq: string): void {
        if (this.isValidSequence(seq)) {
            const structure = new (firstOrderMap.get(seq))(this);
            this.childStructure = structure;
        }
    }
}
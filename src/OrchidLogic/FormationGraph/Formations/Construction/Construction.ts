import { StructureRep } from "../../StructureReps";

/**
 * A construction is essentially anything the user constructs
 * by hand.  A construction can be a valid feature, a Defined Variable
 * declaration, simply a term (for playful progressions), or perhaps a notation
 * definition (though I might have a separate interface for that)
 */
export class Construction {}

export interface ConstructionRep extends StructureRep {
    type: 'construction';
}

export function isConstructionRep(rep: StructureRep): rep is ConstructionRep {
    return rep.type === 'construction';
}
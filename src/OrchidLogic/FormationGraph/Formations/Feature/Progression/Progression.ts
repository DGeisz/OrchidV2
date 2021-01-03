import { StructureRep } from "../../../StructureReps";

/**
 * A logical progression starting from constraints that derives
 * properties from the constructions of constraints.
 *
 * As of 1/3/2021: I'm not entirely sure how this is going to work,
 * but I just built out the basic skeleton of the class.
 */
export class Progression {

}

export interface ProgressionRep extends StructureRep {
    type: 'progression';
}

export function isProgressionRep(rep: StructureRep): rep is ProgressionRep {
    return rep.type === 'progression';
}

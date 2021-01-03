import { Formation, FormationRep } from "./Formation";

/**
 * A conditional formation makes the statement that if the
 * formation constraints hold, then the formation properties
 * also hold.
 *
 * It's basically just a "if, then" or → statement
 */
export class Conditional extends Formation {}


export interface ConditionalRep extends FormationRep {
    formationType: 'conditional';
}

export function isConditionalRep(rep: FormationRep): rep is ConditionalRep {
    return rep.formationType === 'conditional';
}

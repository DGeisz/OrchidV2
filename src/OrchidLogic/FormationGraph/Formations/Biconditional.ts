import { Formation, FormationRep } from "./Formation";

/**
 * This formation is the Orchid construction of
 * an "if and only if" statement.
 *
 * As of 1/3/2021, I'm not sure how I'm actually going to do this
 * because the constraints and properties of this formation have the
 * same structure
 */
export class Biconditional extends Formation {

}

export interface BiconditionalRep extends FormationRep {
    formationType: 'biconditional';
}

export function isBiconditionalRep(rep: FormationRep): rep is BiconditionalRep {
    return rep.formationType === 'biconditional';
}

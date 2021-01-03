import { Formation, FormationRep } from "./Formation";

/**
 * An Existential formation makes the statement that variables
 * exist which satisfy the formation constraints and for which
 * the formation's properties hold.
 *
 * It's more or less a construction of the ∃ quantifier.
 */
export class Existential extends Formation {

}

export interface ExistentialRep extends FormationRep {
    formationType: 'existential';
}

export function isExistentialRep(rep: FormationRep): rep is ExistentialRep {
    return rep.formationType === 'existential';
}

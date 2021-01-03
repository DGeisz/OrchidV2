import { Formation, FormationRep } from "./Formation";

/**
 * A Universal formation is a formation which makes the
 * statement that any variables that obey its constraints
 * must also have its properties.
 *
 * It's more or less a construction of the ∀ quantifier.
 */
export class Universal extends Formation {

}

export interface UniversalRep extends FormationRep {
    formationType: 'universal';
}

export function isUniversalRep(rep: FormationRep): rep is UniversalRep {
    return rep.formationType === 'universal';
}
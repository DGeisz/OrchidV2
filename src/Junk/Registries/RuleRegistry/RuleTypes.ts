export interface Term {
    id: string;
}

export interface Tuple extends Term {
    items: RuleTerm[];
}

export interface CartesianProduct extends Term {
    constituentSets: NonListTerm[];
}

export interface DerivedTerm extends Term {
    map: Term; //The map that created this term
    arg: Term | Tuple; //id of the term that is the argument of the map
}

export type NonListTerm = Term | DerivedTerm;

export type RuleTerm = Term | Tuple | CartesianProduct | DerivedTerm;

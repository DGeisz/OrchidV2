export interface Term {
    id: string;
    sets: string[]; //The sets of which this term is a part
}

export interface Tuple extends Term {
    items: string[]; //The ids of the terms in this tuple
}

export interface CartesianProduct extends Term {
    constituentSets: string[]; //The ids of the sets that form this cartesian product
}

export interface DerivedTerm extends Term {
    map: string; //The map that created this term
    arg: string; //id of the term that is the argument of the function
}

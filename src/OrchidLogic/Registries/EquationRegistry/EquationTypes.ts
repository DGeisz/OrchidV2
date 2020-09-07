export interface TermInstance {
    id: string;
    instanceId: string;
}

export interface TupleInstance extends TermInstance {
    items: SocketInstance[];
}

export interface CartesianProductInstance extends TermInstance {
    constituentSets: SocketInstance[];
}

export interface DerivedTermInstance extends TermInstance {
    map: SocketInstance;
    arg: SocketInstance;
}

export interface SocketInstance {
    id: string;
    type: SocketType;
    childStructure?: EquationTermType;
}

export interface TermSocketInstance extends SocketInstance {
    set: string;
}

export enum SocketType {
    input,
    term,
    line
}

export type EquationTermType = TermInstance | TupleInstance | CartesianProductInstance | DerivedTermInstance;

export type EquationModelType = EquationTermType | SocketInstance;

export type EquationPage = EquationModelType[];

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
    type: "input" | "term" | "line";
}

export type EquationModelType = TermInstance | TupleInstance | CartesianProductInstance | DerivedTermInstance | SocketInstance;

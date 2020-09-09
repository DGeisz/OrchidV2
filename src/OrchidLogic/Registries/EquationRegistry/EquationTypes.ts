export interface TermInstance {
    id: string; //This is the instance id
    termId: string;
}

export interface TupleInstance extends TermInstance {
    items: SocketInstance[];
}

export function isTuple(node: EquationNodeType): node is TupleInstance {
    return 'items' in node;
}

export interface CartesianProductInstance extends TermInstance {
    constituentSets: SocketInstance[];
}

export function isCartesianProduct(node: EquationNodeType): node is CartesianProductInstance {
    return 'constituentSets' in node;
}

export interface DerivedTermInstance extends TermInstance {
    map: SocketInstance;
    arg: SocketInstance;
}

export function isDerivedTerm(node: EquationNodeType): node is DerivedTermInstance {
    return 'map' in node;
}

export interface SocketInstance {
    id: string;
    type: SocketType;
    childStructure?: EquationTermType;
}

export function isSocket(node: EquationNodeType): node is SocketInstance {
    return 'type' in node;
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

export type EquationNodeType = EquationTermType | SocketInstance;

export type EquationPage = EquationNodeType[];

export interface NodeInstance {
    id: string; //This is the instance id
    type: 'set' | 'map' | 'term' | 'socket'; //This is the type of the structure
}

export interface NodeShape {
    type: 'set' | 'map' | 'term' | 'socket'; //This is the type of the structure
}

export interface MapInstance extends NodeInstance {
    source: string;
    target: string;
}

export interface MapShape extends NodeShape {
    source: string;
    target: string;
}

export function isMap(node: EquationNodeInstance): node is MapInstance {
    return node.type === 'map';
}

export interface SetDefInstance extends NodeInstance {
    type: 'set'
    newSet: SocketInstance;
}

export interface SetDefShape extends NodeShape {
    type: 'set'
    newSet: SocketInstance;
}

export function isSetDef(node: NodeInstance): node is SetDefInstance {
    return node.type === 'set';
}

export interface TermInstance extends NodeInstance {
    termId: string;
    type: 'term'
}

export interface TermShape extends NodeShape {
    termId: string;
    type: 'term'
}

export function isTerm(node: EquationNodeInstance): node is TermInstance {
    return node.type === 'term';
}

export interface TupleInstance extends TermInstance {
    items: SocketInstance[];
}

export interface TupleShape extends TermShape {
    items: SocketInstance[];
}

export function isTuple(node: EquationNodeInstance): node is TupleInstance {
    return 'items' in node;
}

export interface CartesianProductInstance extends TermInstance {
    constituentSets: SocketInstance[];
}

export interface CartesianProductShape extends TermShape {
    constituentSets: SocketInstance[];
}

export function isCartesianProduct(node: EquationNodeInstance): node is CartesianProductInstance {
    return 'constituentSets' in node;
}

export interface DerivedTermInstance extends TermInstance {
    map: SocketInstance;
    arg: SocketInstance;
}

export interface DerivedTermShape extends TermShape {
    map: SocketInstance;
    arg: SocketInstance;
}

export function isDerivedTerm(node: EquationNodeInstance): node is DerivedTermInstance {
    return 'map' in node;
}

export interface SocketInstance extends NodeInstance {
    type: 'socket';
    childStructure?: EquationTermInstance;
    socketType: 'termDef' | 'term' | 'line';
}

export interface SocketShape extends NodeShape {
    type: 'socket';
    childStructure?: EquationTermInstance;
    socketType: 'termDef' | 'term' | 'line';
}

export function isSocket(node: EquationNodeInstance): node is SocketInstance {
    return node.type === 'socket';
}

export interface TermSocketInstance extends SocketInstance {
    socketType: 'term';
    set: string;
}

export interface TermSocketShape extends SocketShape {
    socketType: 'term';
    set: string;
}

export type EquationTermInstance = TermInstance | TupleInstance | CartesianProductInstance | DerivedTermInstance;
export type EquationTermShape = TermShape | TupleShape | CartesianProductShape | DerivedTermShape;

export type EquationStructureInstance = EquationTermInstance | MapInstance | SetDefInstance;
export type EquationStructureShape = EquationTermShape | MapShape | SetDefShape;

export type EquationSocketInstance = SocketInstance | TermSocketInstance;
export type EquationSocketShape = SocketShape | TermSocketShape;

export type EquationNodeInstance = NodeInstance | EquationStructureInstance | EquationSocketInstance;
export type EquationNodeShape = NodeShape | EquationStructureShape | EquationSocketShape;

export type EquationPage = EquationNodeInstance[];

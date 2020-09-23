interface BasicInstanceType {
    id: string;
    isRepresented: boolean; //True iff this instance has a view representation (not necessary for the map or tuple instance of a custom map template)
}

export interface LeafInstanceType extends BasicInstanceType {
    iOf: string; //instance of which quiver i.e. instance >- iOf -> x
}

export function isLeafInstance(instance: InstanceType): instance is LeafInstanceType {
    return 'iOf' in instance;
}

export interface DerivedInstanceType extends BasicInstanceType {
    map: InstanceType;
    arg: InstanceType;
}

export function isDerivedInstance(instance: InstanceType): instance is DerivedInstanceType {
    return 'map' in instance;
}

export interface TupleInstanceType extends BasicInstanceType {
    items: InstanceType[];
}

export function isTupleInstance(instance: InstanceType): instance is TupleInstanceType {
    return 'items' in instance;
}

export type InstanceType = LeafInstanceType | DerivedInstanceType | TupleInstanceType;

export type PageType = InstanceType[];

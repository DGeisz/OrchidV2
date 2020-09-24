/**
 * An instance is essentially the instance of a term
 * in an equation
 */
export interface BasicInstanceType {
    id: string;
    isRepresented: boolean; //True iff this instance has a view representation (not necessary for the map or tuple instance of a custom map template)
}

export function isBasicInstance(instance: InstanceType): instance is BasicInstanceType {
    return !(isLeafInstance(instance) || isTupleInstance(instance) || isDerivedInstance(instance));
}

/**
 * This is an instance that is in it's final form,
 * ie, it has a static non-variable representation, like x or G.
 * This is in contrast to Derived or Tuple instances, who's type and
 * structure is intrinsically dependent on other terms
 */
export interface LeafInstanceType extends BasicInstanceType {
    iOf: string; //instance of which quiver i.e. instance >- iOf -> x
}

export function isLeafInstance(instance: InstanceType): instance is LeafInstanceType {
    return 'iOf' in instance;
}

/**
 * This is the term that is the output of a map
 */
export interface DerivedInstanceType extends BasicInstanceType {
    map: InstanceType;
    arg: InstanceType;
}

export function isDerivedInstance(instance: InstanceType): instance is DerivedInstanceType {
    return 'map' in instance;
}

/**
 * This is the abstraction for a tuple.
 * Can be thought of a map from many terms to
 * one term
 */
export interface TupleInstanceType extends BasicInstanceType {
    items: InstanceType[];
}

export function isTupleInstance(instance: InstanceType): instance is TupleInstanceType {
    return 'items' in instance;
}

export type InstanceType = LeafInstanceType | DerivedInstanceType | TupleInstanceType | BasicInstanceType;

export type PageType = InstanceType[];

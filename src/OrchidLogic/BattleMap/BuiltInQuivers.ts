export const builtInQuivers = {
    iOf: 'iOf', //Targets the quiver of which the source instance is an instance
    map: 'map', //Targets the map of a derived term
    arg: 'arg', //Targets the arg of a derived term
    isDerived: 'isDerived',
    isTuple: 'isTuple',
    isLeaf: 'isLeaf',
    tupleSize: 'tupleSize',
    index: 'index', //This is actually used with numbers to index a tuple from the battle map, so it would be used like 'index0'
    takesDef: 'takesDef', //Whether this quiver allows for a definition
};

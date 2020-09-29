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
    type: 'type', //Sources basically any orchid defined quiver and targets a proposition quiver that is the defining characteristic of that quiver
    targetType: 'targetType', //Sources any quiver containing arrows and targets a proposition quiver that is the defining characteristic of the target quiver
    sourceType: 'sourceType', //Sources any quiver containing arrows and targets a proposition quiver that is the defining characteristic of the source quiver
    isTupleType: 'isTupleType', //Sources any type quiver (proposition) and targets the boolean quiver that indicates whether the type quiver accepts a tuple
};

/**
 * These are a list of all quivers that exist within the
 * default battle map
 *
 * Also note that string representations of integers are
 * valid quivers
 */
export const builtInQuivers: {[key: string]: string} = {
    //These first quivers are inaccessible and have "editor" roles
    iOf: 'iOf', //Targets the quiver of which the source instance is an instance
    map: 'map', //Targets the map of a derived term
    arg: 'arg', //Targets the arg of a derived term
    isDerived: 'isDerived',
    isTuple: 'isTuple',
    isLeaf: 'isLeaf',
    tupleSize: 'tupleSize',
    index: 'i', //This is actually used with numbers to index a tuple from the battle map, so it would be used like 'i0'
    takesDef: 'takesDef', //Whether this quiver allows for a definition
    sourceTakesDef: 'sourceTakesDef', //Indicates that any quiver this quiver sources ought take a definition

    type: 'type', //Sources basically any orchid defined quiver and targets a proposition quiver that is the defining characteristic of that quiver
    targetType: 'targetType', //Sources any quiver containing arrows and targets a proposition quiver that is the defining characteristic of the target quiver
    sourceType: 'sourceType', //Sources any quiver containing arrows and targets a proposition quiver that is the defining characteristic of the source quiver

    isMapType: 'isMapType', //This indicates that a given type is a type describing a map
    mapTypeTarget: 'mapTypeTarget', //The target type of a map type
    mapTypeSource: 'mapTypeSource', //The source type of a map type

    isTupleType: 'isTupleType', //Indicates that a given type is a type describing a tuple
    typeIndex: 'tI', //Just like with 'index', this is used to index a tuple type to check the types of the tuples elements
    tupleTypeSize: 'tupleTypeSize', //Size of tuple defined by this tuple type

    //These quivers are accessible and have meaning
    true: 'true',
    false: 'false',
    isBool: 'isBool',
    isQuiver: 'isQuiver',
};

export const builtInBattleMap: {[key: string]: {[key: string]: string}} = {
    isBool: {
        sourceType: builtInQuivers.isQuiver,
        targetType: builtInQuivers.isBool,
        sourceTakesDef: builtInQuivers.true
    },
    isQuiver: {
        sourceType: builtInQuivers.isQuiver,
        targetType: builtInQuivers.isBool,
        sourceTakesDef: builtInQuivers.true
    },
    true: {
        isBool: builtInQuivers.true
    },
    false: {
        isBool: builtInQuivers.true
    }
};

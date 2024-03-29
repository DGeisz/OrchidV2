import { v4 } from 'uuid';
import { BattleMap } from "../../BattleMap/BattleMap";
import { InstanceType } from "./FlatInstanceTypes";
import { builtInQuivers } from "../../BattleMap/BuiltInQuivers";
import { parseBoolean } from "../../../OrchidLogic/utils/functions";
import { InstanceRegistry } from "./InstanceRegistry";
import { Line } from "../PageRegistry/Line";

/**
 * Essentially the middle man between the quiver representation
 * of an instance and the various registries and editor complex.
 */
export class Instance {
    private readonly id: string;

    //References within the instance chain
    private prev: Instance | null = null;
    private next: Instance | null = null;

    //References to higher structures
    private readonly battleMap: BattleMap;
    private readonly instanceRegistry: InstanceRegistry;
    private readonly line: Line;

    //Quiver properties of the instance
    private isRepresented: boolean; //Is there a corresponding view to this instance (not the case for custom maps with tuple args)
    private isFilled: boolean; //If this is represented, has its representation been filled out, ie, has the "socket" been filled

    constructor(battleMap: BattleMap, instanceRegistry: InstanceRegistry, line: Line, isRepresented: boolean = true) {
        this.id = v4();
        this.battleMap = battleMap;
        this.battleMap.putQuiver(this.id);
        this.line = line;
        this.instanceRegistry = instanceRegistry;
        this.instanceRegistry.putInstance(this.id, this);
        this.isRepresented = isRepresented;
        this.isFilled = false;
    }

    getId(): string {
        return this.id;
    }

    getFlatRep(): InstanceType {
        this.isFilled = true;
        const { exists: derivedExists, target: derivedTarget } = this.battleMap.sq2t(this.id, builtInQuivers.isDerived);

        if (derivedExists && parseBoolean(derivedTarget)) {
            const { exists: mapExists, target: mapTarget } = this.battleMap.sq2t(this.id, builtInQuivers.map);
            const { exists: argExists, target: argTarget } = this.battleMap.sq2t(this.id, builtInQuivers.arg);

            if (mapExists && argExists) {
                const mapInstance = this.instanceRegistry.getInstance(mapTarget);
                const argInstance = this.instanceRegistry.getInstance(argTarget);

                if (!(mapInstance || argInstance)) {
                    throw new Error("Map and arg targets of derived quiver in battle map, but not in instance registry");
                }
                return {
                    id: this.id,
                    map: mapInstance.getFlatRep(),
                    arg: argInstance.getFlatRep(),
                    isRepresented: this.isRepresented
                }
            } else {
                throw new Error("Instance quiver is derived, but doesn't have a map or arg in the battle map");
            }
        }

        const { exists: tupleExists, target: tupleTarget } = this.battleMap.sq2t(this.id, builtInQuivers.isTuple);

        if (tupleExists && parseBoolean(tupleTarget)) {
            const { exists: sizeExists, target: sizeTarget } = this.battleMap.sq2t(this.id, builtInQuivers.tupleSize);
            const size = parseInt(sizeTarget);

            if (!sizeExists) {
                throw new Error("Tuple quiver doesn't have defined size");
            } else if (isNaN(size)) {
                throw new Error("Tuple size is NaN");
            }

            const items: InstanceType[] = [];

            for (let i = 0; i < size; i++) {
                const { exists: indexExists, target: indexTarget } = this.battleMap.sq2t(this.id, [builtInQuivers.index, i].join(''));

                if (!indexExists) {
                    throw new Error(`Tuple doesn't have quiver in battle at index ${i}`);
                }

                const indexInstance = this.instanceRegistry.getInstance(indexTarget);

                if (typeof indexTarget === 'undefined') {
                    throw new Error(`Index instance of tuple defined in battle, but not in instanceRegistry`);
                }

                items.push(indexInstance.getFlatRep());
            }

            return {
                id: this.id,
                isRepresented: this.isRepresented,
                items: items
            }
        }

        const { exists: leafExists, target: leafTarget } = this.battleMap.sq2t(this.id, builtInQuivers.isLeaf);

        if (leafExists && parseBoolean(leafTarget)) {
            const { exists: iOfExists, target: iOf } = this.battleMap.sq2t(this.id, builtInQuivers.iOf);

            if (!iOfExists) {
                throw new Error("Instance is leaf, but doesn't have an iOf in battle");
            }

            return {
                id: this.id,
                isRepresented: this.isRepresented,
                iOf: iOf
            }
        }

        this.isFilled = false;

        return {
            id: this.id,
            isRepresented: this.isRepresented
        }
    }

    //Input checkers
    takesDef(): boolean {
        const { exists, target } = this.battleMap.sq2t(this.id, builtInQuivers.takesDef);
        return exists && parseBoolean(target);
    }

    takesEmptyArrow(): boolean {
        return true; //TODO: Right now, can't think of any instance that wouldn't take empty arrow, but impl if otherwise
    }

    takesEmptyTuple(): boolean {
        const { exists, target } = this.battleMap.sq2t(this.id, builtInQuivers.isTuple);
        return exists && parseBoolean(target);
    }

    takesTuple(size: number) {
        const { exists: typeExists, target: type } = this.battleMap.sq2t(this.id, builtInQuivers.type);
        if (typeExists) {
            const { exists: isTupleExists, target: isTuple } = this.battleMap.sq2t(this.id, builtInQuivers.isTuple);
            if (!(isTupleExists && parseBoolean(isTuple))) {
                return false;
            }

            const { exists: tupleSizeExists, target: tupleSize } = this.battleMap.sq2t(this.id, builtInQuivers.tupleSize);
            if (!tupleSizeExists) return true; //If this doesn't exist, it means this instance is a tuple without a definable size
            return size === parseInt(tupleSize);
        } else {
            return false;
        }
    }

    //Committers
    commitEmptyArrow(): Instance {
        //Indicate that this is a derived instance
        this.battleMap.createArrow(this.id, builtInQuivers.isDerived, builtInQuivers.true);

        //Create map and arg quivers
        const mapQuiver = new Instance(this.battleMap, this.instanceRegistry, this.line);
        const argQuiver = new Instance(this.battleMap, this.instanceRegistry, this.line);

        //Create the battle relations between instance and the new quivers
        this.battleMap.createArrow(this.id, builtInQuivers.map, mapQuiver.getId());
        this.battleMap.createArrow(this.id, builtInQuivers.arg, argQuiver.getId());

        //Sync up instances
        mapQuiver.setPrev(this.prev);
        mapQuiver.syncWithNext(argQuiver);
        argQuiver.syncWithNext(this);

        //Return the map quiver, which is the next quiver to fill in
        return mapQuiver;
    }

    commitLeaf(iOf: string): Instance {
        //Indicate that this instance is in fact a leaf
        this.battleMap.createArrow(this.id, builtInQuivers.isLeaf, builtInQuivers.true);

        //Insert iOf into battle map
        this.battleMap.createArrow(this.id, builtInQuivers.iOf, iOf);

        return this.getNext();
    }


    //Getters and setters
    getNext(): Instance | null {
        return this.next;
    }

    setNext(instance: Instance | null): void {
        this.next = instance;
    }

    getPrev(): Instance | null {
        return this.prev;
    }

    setPrev(instance: Instance | null): void {
        this.prev = instance;
    }

    syncWithNext(instance: Instance | null): void {
        if (!instance) {
            this.next = null;
        } else {
            this.setNext(instance);
            instance.setPrev(this);
        }
    }

    setRepresented(isRepresented: boolean): void {
        this.isRepresented = isRepresented;
    }
}

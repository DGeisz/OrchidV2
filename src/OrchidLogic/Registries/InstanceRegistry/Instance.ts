import { v4 } from 'uuid';
import { BattleMap } from "../../BattleMap/BattleMap";
import { InstanceType } from "./FlatInstanceTypes";
import { builtInQuivers } from "../../BattleMap/BuiltInQuivers";
import { parseBoolean } from "../../utils/functions";
import { InstanceRegistry } from "./InstanceRegistry";

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

    //Quiver properties of the instance
    private isRepresented: boolean; //Is there a corresponding view to this instance (not the case for custom maps with tuple args)
    private isFilled: boolean; //If this is represented, has it's representation been filled out, ie, has the "socket" been filled

    constructor(instanceRegistry: InstanceRegistry, isRepresented: boolean = true) {
        this.id = v4();
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

    setIsRepresented(isRepresented: boolean): void {
        this.isRepresented = isRepresented;
    }
}

import { Dock } from "./Dock";
import { RepresentationEngine } from "./RepresentationEngine";
import { PageRegistry } from "../../Junk/RegistriesII/PageRegistry/PageRegistry";
import { RepresentationRegistry } from "../../Junk/RegistriesII/RepresentationRegistry/RepresentationRegistry";
import { BattleMap } from "../../Junk/BattleMap/BattleMap";
import { AccessorRegistry } from "../../Junk/RegistriesII/AccessorRegistry/AccessorRegistry";
import { builtInQuivers } from "../../Junk/BattleMap/BuiltInQuivers";
import { parseBoolean } from "../utils/functions";

export class EditorComplex {
    private readonly dock: Dock;
    private readonly battleMap: BattleMap;
    private readonly accessorRegistry: AccessorRegistry;
    private readonly representationEngine: RepresentationEngine;
    private readonly representationRegistry: RepresentationRegistry;
    private readonly pageRegistry: PageRegistry;

    constructor() {
        this.battleMap = new BattleMap();
        this.pageRegistry = new PageRegistry(this.battleMap);
        this.accessorRegistry = new AccessorRegistry();
        console.log(this.pageRegistry.getFlatPage());
        this.representationRegistry = new RepresentationRegistry();
        this.representationEngine = new RepresentationEngine(this.pageRegistry.getFlatPage(), this.representationRegistry);
        this.dock = new Dock(this.pageRegistry.getCurrentInstance(), this);
    }

    /**
     * Returns true if the arrow quiver accessor defined here
     * targets the same proposition quiver through 'targetType' as
     * the instance quiver does through 'type'
     */
    isArrowCompatible(arrowQuiverAccessor: string, instanceId: string, isArgTuple: boolean): boolean {
        const {exists, id: arrowQuiverId} = this.accessorRegistry.getId(arrowQuiverAccessor);
        console.log('--------- \n\n', exists, arrowQuiverId, arrowQuiverAccessor, isArgTuple);
        if (exists) {
            if (!(this.battleMap.hasQuiver(arrowQuiverId) || this.battleMap.hasQuiver(instanceId))) {
                throw new Error('Arrow quiver or instance quiver not in battle map');
            }

            //Check if arrowQuiver actually takes a tuple
            if (isArgTuple) {
                const {exists: sourceTypeExists, target: sourceType} = this.battleMap.sq2t(arrowQuiverId, builtInQuivers.sourceType);
                console.log("Source type:", sourceTypeExists, sourceType);
                if (sourceTypeExists) {
                    const {exists: isTupleTypeExists, target: isTupleType} = this.battleMap.sq2t(sourceType, builtInQuivers.isTupleType)
                    console.log("Tuple type:", isTupleTypeExists, isTupleType);
                    if (!(isTupleTypeExists && parseBoolean(isTupleType))) {
                        return false; //If we got here, then we're trying to input a tuple where a tuple isn't accepted
                    }
                } else {
                    return false;
                }
            }

            //If instance quiver doesn't have a specific type, then anything is compatible
            const { exists: typeExists, target: type } = this.battleMap.sq2t(instanceId, builtInQuivers.type);
            if (!typeExists) {
                return true;
            }

            const { exists: targetTypeExists, target: targetType } = this.battleMap.sq2t(arrowQuiverId, builtInQuivers.targetType);
            if (!targetTypeExists) {
                //if the arrowQuiver doesn't have a targetType, we don't know the types of quivers it targets
                return false;
            }

            return targetType === type;
        } else {
            return false;
        }
    }

    /**
     * Returns true if the quiver accessor defined here
     * corresponds to a quiver of the same type as the instance
     * quiver in question
     */
    isQuiverCompatible(quiverAccessor: string, instanceId: string): boolean {
        const { exists, id: quiverId } = this.accessorRegistry.getId(quiverAccessor);
        if (exists) {
            const { exists: typeExists, target: instanceType } = this.battleMap.sq2t(instanceId, builtInQuivers.type);
            if (typeExists) {
                const { exists: isTypeExists, target: quiverIsType } = this.battleMap.sq2t(quiverId, instanceType);
                return isTypeExists && parseBoolean(quiverIsType);
            } else {
                //If the instance doesn't specify a type, then anything is compatible
                return true;
            }
        } else {
            return false;
        }
    }

    getRepresentationEngine(): RepresentationEngine {
        return this.representationEngine;
    }

    getDock(): Dock {
        return this.dock;
    }

    getAccessorRegistry(): AccessorRegistry {
        return this.accessorRegistry;
    }
}

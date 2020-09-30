import { Instance } from "../InstanceRegistry/Instance";
import { InstanceType } from "../InstanceRegistry/FlatInstanceTypes";
import { InstanceRegistry } from "../InstanceRegistry/InstanceRegistry";
import { BattleMap } from "../../BattleMap/BattleMap";

export class Line {
    private readonly proposition: Instance;
    private currentInstance: Instance;

    private readonly battleMap: BattleMap;
    private readonly lineInstanceRegistry: InstanceRegistry;

    constructor(battleMap: BattleMap) {
        this.battleMap = battleMap;
        this.lineInstanceRegistry = new InstanceRegistry();
        this.proposition = new Instance(this.battleMap, this.lineInstanceRegistry, this);
        this.currentInstance = this.proposition;
    }

    getCurrentInstance(): Instance {
        return this.currentInstance;
    }

    setCurrentInstance(instance: Instance): void {
        this.currentInstance = instance;
    }

    getFlatLine(): InstanceType {
        return this.proposition.getFlatRep();
    }
}
import { Instance } from "../InstanceRegistry/Instance";
import { InstanceType } from "../InstanceRegistry/FlatInstanceTypes";
import { InstanceRegistry } from "../InstanceRegistry/InstanceRegistry";

export class Line {
    private proposition: Instance;
    private currentInstance: Instance;

    private lineInstanceRegistry: InstanceRegistry;

    constructor() {
        this.lineInstanceRegistry = new InstanceRegistry();
        this.proposition = new Instance(this.lineInstanceRegistry);
    }

    getCurrentInstance(): Instance {
        return this.currentInstance;
    }

    getFlatLine(): InstanceType {
        return this.proposition.getFlatRep();
    }
}
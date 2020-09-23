import { Instance } from "../InstanceRegistry/Instance";
import { InstanceType } from "../InstanceRegistry/FlatInstanceTypes";

export class Line {
    private proposition: Instance;
    private currentInstance: Instance;

    getCurrentInstance(): Instance {
        return this.currentInstance;
    }

    getFlatLine(): InstanceType {
        return this.proposition.getFlatRep();
    }
}
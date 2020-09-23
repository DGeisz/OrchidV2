import { v4 } from 'uuid';
import { BattleMap } from "../../BattleMap/BattleMap";
import { InstanceType } from "./FlatInstanceTypes";

export class Instance {
    private readonly id: string;

    //References within the instance chain
    private prev: Instance | null = null;
    private next: Instance | null = null;

    //References to higher structures
    private readonly battleMap: BattleMap;

    //Quiver properties of the instance
    private type: 'derived' | 'tuple' | 'basic';
    private isRepresented: boolean; //Is there a corresponding view to this instance (not the case for custom maps with tuple args)
    private isFilled: boolean; //If this is represented, has it's representation been filled out, ie, has the "socket" been filled

    constructor() {
        this.id = v4();
    }

    getId(): string {
        return this.id;
    }

    getFlatRep(): InstanceType {
        switch (this.type) {
            case "basic":

            case "derived":
            case "tuple":
        }
    }
}
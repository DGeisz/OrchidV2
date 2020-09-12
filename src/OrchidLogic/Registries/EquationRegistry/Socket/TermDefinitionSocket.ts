import { Socket } from "./Socket";
import { Structure } from "../Structure/Structure";
import { SocketInstance } from "../EquationTypes";

export class TermDefinitionSocket extends Socket {
    constructor(structure: Structure) {
        super();
        this.setParentStructure(structure);
    }

    toFlatRep(): SocketInstance {
        return {
            id: this.id,
            index: this.index,
            type: 'socket',
            socketType: 'termDef'
        }
    }
}
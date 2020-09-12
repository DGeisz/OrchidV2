import { Structure } from "./Structure";
import { Socket } from "../Socket/Socket";
import { TermDefinitionSocket } from "../Socket/TermDefinitionSocket";
import { EquationStructureInstance } from "../EquationTypes";

export class SetDefStructure extends Structure {

    constructor(parentSocket: Socket) {
        super(parentSocket);

        const defSocket = new TermDefinitionSocket(this);
        this.childSockets = [defSocket];

        const nextSocket = parentSocket.getNextSocket();
        parentSocket.syncWithNextSocket(defSocket);
        defSocket.syncWithNextSocket(nextSocket);
    }


    toFlatRep(): EquationStructureInstance {
        return {
            id: this.id,
            type: 'set',
            newSet: this.childSockets[0].toFlatRep()
        }
    }
}
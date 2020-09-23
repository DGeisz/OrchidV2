import { Socket } from "./Socket";
import { SocketInstance } from "../EquationTypes";

export class TermSocket extends Socket {
    constructor() {
        super();
    }

    toFlatRep(): SocketInstance {
        return {
            id: this.id,
            index: this.index,
            type: 'socket',
            socketType: 'term'
        }
    }
}
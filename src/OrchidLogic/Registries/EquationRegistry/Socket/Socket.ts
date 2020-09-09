import { v4 } from 'uuid';
import { Structure } from "../../../../Junk/Structure/Structure";
import { SocketInstance, SocketType } from "../EquationTypes";

export class Socket {
    protected readonly id: string;

    protected nextSocket: Socket | null = null;
    protected prevSocket: Socket | null = null;

    /**
     * Underlying parent of the socket, if any
     */
    protected parentStructure: Structure | null = null;

    /**
     * Plugged in child structure, if any
     */
    protected childStructure: Structure | null = null;

    constructor() {
        this.id = v4();
    }

    getPrevSocket(): Socket | null {
        return this.prevSocket;
    }

    setPrevSocket(socket: Socket): void {
        this.prevSocket = socket;
    }

    getNextSocket(): Socket | null {
        return this.nextSocket;
    }

    setNextSocket(socket: Socket): void {
        this.nextSocket = socket;
    }

    syncWithNextSocket(socket: Socket): void {
        this.setNextSocket(socket);
        socket.setPrevSocket(this);
    }

    setParentStructure(structure: Structure): void {
        this.parentStructure = structure;
    }

    getId(): string {
        return this.id;
    }

    toFlatRep(): SocketInstance {
        return {
            id: this.id,
            type: SocketType.input,
        }
    }
}
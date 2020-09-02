import {v4} from 'uuid';
import { Structure } from "../Structure/Structure";

/**
 * A socket is an entity that houses a structure,
 * i.e. that structure "plugs into" the socket.
 */
export class Socket {
    protected readonly id: string;
    protected readonly domParentId: string;

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

    /**
     * Constructor not only creates a new instance of
     * a socket, but it also populates DOM with corresponding html
     */
    constructor(domParentId: string) {
        this.domParentId = domParentId;
        this.id = v4();

        let thisElement = document.createElement("div");
        thisElement.setAttribute('id', this.id);
        thisElement.setAttribute('class', 'socket');
        thisElement.innerText = "☐";

        const parent = document.getElementById(this.domParentId);
        parent.appendChild(thisElement);
    }

    getId(): string {
        return this.id;
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

    /**
     * Determines if the sequence in the
     * dock corresponds to a valid structure
     * for this particular socket
     */
    isValidSequence(seq: string): boolean {
        return false;
    }

    /**
     * Attempts to commit a particular sequence.
     */
    commitSequence(seq: string): void {}

}
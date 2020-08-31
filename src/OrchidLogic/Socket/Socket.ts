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
     * Constructor not only creates a new instance of
     * a socket, but it also populates DOM with corresponding html
     */
    constructor(domParentId: string) {
        this.domParentId = domParentId;
        this.id = v4();
    }

    getId(): string {
        return this.id;
    }

    setPrevSocket(socket: Socket): void {
        this.prevSocket = socket;
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
     * If the sequence is valid, injects the proper
     * html corresponding to the sequence and returns
     * the id of the next socket.  If the sequence is
     * invalid, returns an empty string
     */
    commitSequence(seq: string): string {
        return "";
    }

}
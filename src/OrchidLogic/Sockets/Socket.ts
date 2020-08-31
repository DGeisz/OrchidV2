import {v4} from 'uuid';

export class Socket {
    protected readonly id: string;

    constructor() {
        this.id = v4();
    }

    getId(): string {
        return this.id;
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
import { Socket } from "../Socket/Socket";
import { v4 } from 'uuid';

/**
 * A structure is any entity that "plugs into"
 * a socket, both in model and view.  Mathematical structures
 * can be terms, maps, sets, etc.  First order structures are
 * mostly definitions or equalities.  Essentially a structure
 * is any entity that renders html and has meaning with the
 * OrchidLogic model. Structures also handle side effects from
 * the socket commits of any child socket (like term creation or whatnot)
 */
export class Structure {
    /**
     * Socket this structure plugs into
     */
    protected parentSocket: Socket;

    /**
     * List of any child sockets this
     * structure may contain
     */
    protected childSockets: Socket[] = [];

    /**
     * Id of the structure
     */
    protected readonly id: string;

    /**
     * The structure constructor should both
     * create a new Structure instance, and also
     * populate DOM with html
     */
    constructor(parentSocket: Socket) {
        this.parentSocket = parentSocket;
        this.id = v4();
    }

}
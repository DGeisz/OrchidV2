import { Structure } from "../Structure";
import { Socket } from "../../Socket/Socket";
import { v4 } from 'uuid';
import { TermDefinitionSocket } from "../../Socket/TermDefinitionSocket";

/**
 * SetDefinition defines a set.  Plugs into a LineSocket
 */
export class SetDefinition extends Structure {

    constructor(parentSocket: Socket) {
        super(parentSocket);

        const setDefElement = document.createElement('div');
        setDefElement.setAttribute('id', this.id);

        const parentElement = document.getElementById(this.parentSocket.getId());
        parentElement.appendChild(setDefElement);

        const termDefSocketHolder = document.createElement('div');
        const termDefSocketHolderId = v4();
        termDefSocketHolder.setAttribute('id', termDefSocketHolderId);
        setDefElement.appendChild(termDefSocketHolder);

        const fillerTextElement = document.createElement('div');
        fillerTextElement.innerText = ' = {}';
        setDefElement.appendChild(fillerTextElement);

        const termDefSocket = new TermDefinitionSocket(termDefSocketHolderId, this);
        termDefSocket.setNextSocket(parentSocket.getNextSocket());
        parentSocket.syncWithNextSocket(termDefSocket);

        this.childSockets.push(termDefSocket);
    }
}


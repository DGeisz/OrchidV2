import { Structure } from "../Structure";
import { Socket } from "../../Socket/Socket";
import { v4 } from 'uuid';
import { TermDefinitionSocket } from "../../Socket/TermDefinitionSocket";

/**
 * SetDefinition defines a set.  Plugs into a LineSocket
 */
export class SetDefinition extends Structure {

    constructor(domParentId: string, parentSocket: Socket) {
        super(domParentId, parentSocket);

        const setDefElement = document.createElement('div');
        setDefElement.setAttribute('id', this.id);

        const parentElement = document.getElementById(domParentId);
        parentElement.appendChild(setDefElement);

        const termDefSocketHolder = document.createElement('div');
        const termDefSocketHolderId = v4();
        termDefSocketHolder.setAttribute('id', termDefSocketHolderId);
        setDefElement.appendChild(termDefSocketHolder);

        const fillerTextElement = document.createElement('div');
        fillerTextElement.innerText = ' = {}';
        setDefElement.appendChild(fillerTextElement);

        this.childSockets.push(new TermDefinitionSocket(termDefSocketHolderId, this));
    }
}
import { SocketInstance } from "../EquationRegistry/EquationTypes";
import { RepresentationTemplate } from "./RepresentationTypes";

/**
 * Registry of the encoded formats for
 * rendering terms for each term
 */
export class RepresentationRegistry{

    getSocketTemplate(socketInstance: SocketInstance): RepresentationTemplate {
        return {
            id: socketInstance.id,
            elementType: 'div',
            class: ['socket', socketInstance.type].join(' '),
            children: []
        }
    }

    getDockTemplate(): RepresentationTemplate {
        return {
            id: 'dock',
            elementType: 'div',
            class: '',
            children: []
        }
    }
}
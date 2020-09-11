import { EquationNodeInstance, isSetDef, isSocket, isTerm, SocketInstance } from "../EquationRegistry/EquationTypes";
import { EquationToTemplateMapping, RepresentationTemplate } from "./RepresentationTypes";

/**
 * Registry of the encoded formats for
 * rendering terms for each term
 */
export class RepresentationRegistry{

    private equationMappings: Map<string, EquationToTemplateMapping[]>;

    constructor() {
        this.equationMappings = new Map<string, EquationToTemplateMapping[]>();
    }


    getNodeTemplate(node: EquationNodeInstance): RepresentationTemplate {
        if (isSocket(node)) {
            return {
                id: node.id,
                elementType: 'div',
                class: ['socket', node.socketType].join(' '),
                children: []
            }
        } else if (isTerm(node)) {

        } else {

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

    getRepresentationTemplate(id: string): RepresentationTemplate {
        return {
            id: '',
            elementType: 'div',
            class: '',
            children: []
        }
    }
}
import {
    DerivedTermInstance,
    EquationNodeInstance,
    EquationNodeShape, EquationSocketInstance,
    isSocket,
    isTerm, isTermSocket,
} from "../EquationRegistry/EquationTypes";
import { EquationToTemplateMapping, RepresentationTemplate } from "./RepresentationTypes";
import { getBuiltInMapping } from "./BuiltInMappings";

/**
 * Registry of the encoded formats for
 * rendering terms for each term
 */
export class RepresentationRegistry{

    private equationMappings: Map<string, EquationToTemplateMapping[]>;

    constructor() {
        this.equationMappings = new Map<string, EquationToTemplateMapping[]>();
    }

    /**
     * First return arg is true only if the map socket
     * is filled in and corresponds to a custom multi arg template
     */
    getMultiArgMapTemplate(node: DerivedTermInstance, index2IdMap: Map<number, string>): [boolean, RepresentationTemplate] {
        //TODO Actually implement this
        return [false, {
            elementType: 'div',
            id: '',
            class: '',
            children: []
        }];
    }

    /**
     * First return arg is true only if the map socket
     * is filled in and corresponds to a custom single arg template
     */
    getMapTemplate(node: DerivedTermInstance, index2IdMap: Map<number, string>): [boolean, RepresentationTemplate] {
        return [false, {
            elementType: 'div',
            id: '',
            class: '',
            children: []
        }];
    }

    getSocketTemplate(node: EquationSocketInstance): RepresentationTemplate {
        return {
            elementType: 'div',
            id: node.id,
            class: ['socket', node.socketType].join(' '),
            innerText: '☐',
            children: []
        }
    }

    getBuiltInTemplate(node: EquationNodeInstance, index2IdMap: Map<number, string>): RepresentationTemplate {
        const template = getBuiltInMapping(node.type);
        template.id = node.id;
        this.populateTemplate(template, index2IdMap);
        console.log("Final template:", template, index2IdMap);
        return template;
    }

    /**
     * Populates a template with ids
     * from index2IdMap
     */
    private populateTemplate(template: RepresentationTemplate, index2IdMap: Map<number, string>): void {
        console.log("Shalom");
        if (typeof template.repId === 'number') {
            console.log(template.repId, index2IdMap.has(template.repId), index2IdMap.get(template.repId));
            template.id = index2IdMap.has(template.repId) ? index2IdMap.get(template.repId) : '';
        }
        for (let childTemplate of template.children) {
            this.populateTemplate(childTemplate, index2IdMap);
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
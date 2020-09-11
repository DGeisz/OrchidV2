import { EquationNodeShape } from "../EquationRegistry/EquationTypes";

/**
 * This is an editor specific format.
 * In this case, the view is represented
 * using html, so our representation format
 * matches a dom
 */
export interface RepresentationTemplate {
    repId?: number; //This is an id that's internal to a rep, which allows this node to be referenced elsewhere

    //The rest of these correspond to typical dom characteristics
    elementType: "div";
    id: string;
    class: string;
    innerText?: string;
    children: RepresentationTemplate[];
}


/**
 * This provides the customizable mapping between
 * some equation node structure and it's corresponding
 * representation template
 */
export interface EquationToTemplateMapping {
    equation: EquationNodeShape;
    template: RepresentationTemplate;
    depth: number;
}
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
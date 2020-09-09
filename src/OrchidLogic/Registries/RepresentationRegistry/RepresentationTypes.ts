/**
 * This is an editor specific format.
 * In this case, the view is represented
 * using html, so our representation format
 * matches a dom
 */
export interface RepresentationTemplate {
    elementType: "div";
    id: string;
    class: string;
    children: RepresentationTemplate[];
}
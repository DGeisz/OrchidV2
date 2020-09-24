import { viewTags } from "../../Editor/BuiltIns";

/**
 * This is an editor specific format.
 * In this case, the view is represented
 * using html, so our representation format
 * matches a dom
 */
export interface RepresentationTemplate {
    elementType: typeof viewTags[keyof typeof viewTags];
    id: string;
    class: string;
    innerText?: string;
    children: RepresentationTemplate[];
}

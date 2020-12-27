import { ContentType } from "../../ContentTypes";

/**
 * A property is a scope structure that is either
 * derived or constructed.  If the property is constructed,
 * then it is because the current scope is a constrained scope
 * and the property is treated as an axiom.  Otherwise, the property
 * must be derived from previous symbology and constraints.
 *
 * A property can also contain an unconstrained scope.
 */
export class Property {
    content: ContentType;
}
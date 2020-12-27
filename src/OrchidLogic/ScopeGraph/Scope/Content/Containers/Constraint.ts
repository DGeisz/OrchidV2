import { ContentType } from "../../ContentTypes";

/**
 * A constraint is a user-constructed structure that
 * puts a constraint on either the scope's symbology (ie is a definition)
 * of places a constraint the mathematical structure of
 * the introduced symbols
 */
export class Constraint {
    /**
     * A constraint's content can only be a construction
     * or a (constrained) scope
     */
    private content: ContentType;
}
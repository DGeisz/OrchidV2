import { v4 } from 'uuid';
import { termPropositions } from "./BuiltInTerms";

/**
 * A registry of all terms in use,
 * essentially a wrapper around TermRegistry JSON
 */
export class TermRegistry{

    /**
     * List of all term ids
     * (this might be all I need from this??)
     */
    private readonly termIds: string[];

    constructor() {
        this.termIds = Object.values(termPropositions);
    }

    /**
     * Generates a new term, returns its id
     */
    newTerm(): string {
        const termId = v4();
        this.termIds.push(termId);
        return termId;
    }

    /**
     * Returns all terms
     */
    getAllTerms(): string[] {
        return this.termIds;
    }
}

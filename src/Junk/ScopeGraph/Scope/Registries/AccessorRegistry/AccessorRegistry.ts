import { builtInAccessorMap } from "./BuiltInAccessors";

export class AccessorRegistry {
    /**
     * Mapping from accessor to id
     */
    private readonly accessor2Id: Map<string, string>;

    /**
     * Mapping from id to accessor
     */
    private readonly id2Accessor: Map<string, string>;

    constructor() {
        this.accessor2Id = new Map<string, string>();
        this.id2Accessor = new Map<string, string>();

        for (let accessor in builtInAccessorMap) {
            this.setAccessor(accessor, builtInAccessorMap[accessor]);
        }
    }

    /**
     * Add a new term to the registry and generate
     * an accessor for the term
     */
    addNewTerm(quiverSeq: string, qid: string) {
        let currentAccessor = quiverSeq;

        while (this.accessor2Id.has(currentAccessor)) {
            currentAccessor = AccessorRegistry.nextAccessor(quiverSeq, currentAccessor);
        }

        this.setAccessor(currentAccessor, qid);
    }

    /**
     * Gets the id of the quiver corresponding to this
     * accessor.  Also return whether the accessor exists
     * as the first return of the tuple
     */
    getId(accessor: string): {exists: boolean, id: string} {
        if (this.accessor2Id.has(accessor)) {
            return {exists: true, id: this.accessor2Id.get(accessor)};
        } else {
            return {exists: false, id: ''};
        }
    }

    /**
     * Sets an accessor
     */
    setAccessor(accessor: string, id: string) {
        this.accessor2Id.set(accessor, id);
        this.id2Accessor.set(id, accessor);
    }

    /**
     * Generates the next accessor available for seq
     */
    private static nextAccessor(originalSeq: string, currentSeq: string): string {
        if (originalSeq === currentSeq) {
            return [originalSeq, 'a'].join('');
        }
        const lastChar = currentSeq[currentSeq.length - 1];
        if (lastChar === 'z') {
            return [currentSeq, 'a'].join('');
        } else {
            return currentSeq.substring(0, currentSeq.length - 1)
                + String.fromCharCode(currentSeq.charCodeAt(currentSeq.length - 1) + 1);
        }
    }
}
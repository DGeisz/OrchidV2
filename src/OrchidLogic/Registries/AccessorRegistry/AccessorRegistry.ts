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
    }

    /**
     * Add a new term to the registry and generate
     * an accessor for the term
     */
    addNewTerm(termSeq: string, termId: string) {
        let currentAccessor = termSeq;

        while (this.accessor2Id.has(currentAccessor)) {
            currentAccessor = AccessorRegistry.nextAccessor(termSeq, currentAccessor);
        }

        this.accessor2Id.set(currentAccessor, termId);
        this.id2Accessor.set(termId, currentAccessor);
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
            return  currentSeq.substring(0, currentSeq.length - 1)
                + String.fromCharCode(currentSeq.charCodeAt(currentSeq.length - 1) + 1);
        }
    }
}
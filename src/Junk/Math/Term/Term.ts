/**
 * A term is an abstract entity that in general
 * is a member of some set (for it to be meaningful)
 */
export class Term {

    readonly characterSequence: string;

    constructor(seq: string) {
        this.characterSequence = seq;
    }

    isMap(): boolean {
        return false;
    }

    isTuple(): boolean {
        return false;
    }

    isSet(): boolean {
        return false;
    }

    populateHtml(parentId: string): void {}
}
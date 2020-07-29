import {v4} from 'uuid';

export class Socket {
    protected readonly id: string;

    constructor() {
        this.id = v4();
    }

    getId(): string {
        return this.id;
    }
}
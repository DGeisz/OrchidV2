import { Instance } from "./Instance";

export class InstanceRegistry {
    private instanceMap: Map<string, Instance>;

    constructor() {
        this.instanceMap = new Map<string, Instance>();
    }

    getInstance(input: string): Instance | undefined {
        return this.instanceMap.get(input);
    }

    putInstance(id: string, instance: Instance): void {
        this.instanceMap.set(id, instance);
    }
}
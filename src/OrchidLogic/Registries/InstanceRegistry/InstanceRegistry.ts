import { Instance } from "./Instance";

export class InstanceRegistry {
    private instanceMap: Map<string, Instance>;

    getInstance(input: string): Instance | undefined {
        return this.instanceMap.get(input);
    }

}
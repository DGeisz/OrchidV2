import { builtInBattleMap } from "./BuiltInQuivers";

export class BattleMap {
    private quiverMap: Map<string, Map<string, string>>;

    constructor() {
        this.quiverMap = new Map<string, Map<string, string>>();

        for (let quiver in builtInBattleMap) {
            this.quiverMap.set(quiver, new Map<string, string>(Object.entries(builtInBattleMap[quiver])));
        }
    }

    /**
     * sq2t = Source and Quiver to Target, so if S >- Q -> T,
     * then we're getting T from S and Q
     */
    sq2t(source: string, quiver: string): {exists: boolean, target: string} {
        if (this.quiverMap.has(source)) {
            const sourcedArrows = this.quiverMap.get(source);
            if (sourcedArrows.has(quiver)) {
                return {
                    exists: true,
                    target: sourcedArrows.get(quiver)
                }
            }
        }
        return {
            exists: false,
            target: ''
        }
    }

    /**
     * Simply adds a quiver to the battle map
     */
    putQuiver(quiver: string): void {
        this.quiverMap.set(quiver, new Map<string, string>());
    }

    /**
     * Creates an arrow from source, throw quiver, to target
     */
    createArrow(source: string, quiver: string, target: string): void {
        let sourcedArrows: Map<string, string>;
        if (this.hasQuiver(source)) {
            sourcedArrows = this.quiverMap.get(source);
        } else {
            sourcedArrows = new Map<string, string>();
            this.quiverMap.set(source, sourcedArrows);
        }
        sourcedArrows.set(quiver, target);
    }

    /**
     * Check whether battle map contains a quiver
     */
    hasQuiver(qid: string): boolean {
        return this.quiverMap.has(qid);
    }
}


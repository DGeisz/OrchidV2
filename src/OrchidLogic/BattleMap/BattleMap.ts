export class BattleMap {
    private quiverMap: Map<string, Map<string, string>>;

    constructor() {
        this.quiverMap = new Map<string, Map<string, string>>();
    }

    /**
     * sq2t = Source and Quiver to Target, so if S >- Q -> T,
     * then we're getting T from S and Q
     */
    sq2t(source: string, quiver: string): {exists: boolean, target: string} {
        if (this.quiverMap.has(source)) {
            const quiverArrows = this.quiverMap.get(source);
            if (quiverArrows.has(quiver)) {
                return {
                    exists: true,
                    target: quiverArrows.get(quiver)
                }
            }
        }
        return {
            exists: false,
            target: ''
        }
    }
}


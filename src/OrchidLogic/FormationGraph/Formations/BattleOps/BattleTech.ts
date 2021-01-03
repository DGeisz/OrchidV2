import { BattleMap } from "./BattleMap";

/**
 * The BattleTech is a layer of abstraction that sits
 * on top of the BattleMap and provides helpful operations
 * on the battle map that arise frequently.
 *
 * Essentially helper functions for the battle map
 */
export class BattleTech {
    private readonly battleMap: BattleMap;

    constructor(battleMap: BattleMap) {
        this.battleMap = battleMap;
    }
}
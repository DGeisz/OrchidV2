import { builtInQuivers } from "../../BattleMap/BuiltInQuivers";

export const builtInAccessorMap: { [key: string]: string; } = {
    iB: builtInQuivers.isBool,
    iQ: builtInQuivers.isQuiver
};
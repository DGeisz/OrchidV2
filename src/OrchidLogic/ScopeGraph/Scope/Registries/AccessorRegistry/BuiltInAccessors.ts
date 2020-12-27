import { builtInQuivers } from "../../BattleOps/BuiltInQuivers";

export const builtInAccessorMap: { [key: string]: string; } = {
    iB: builtInQuivers.isBool,
    iQ: builtInQuivers.isQuiver
};
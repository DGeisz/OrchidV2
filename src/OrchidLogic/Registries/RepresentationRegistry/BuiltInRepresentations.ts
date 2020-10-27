import { builtInQuivers } from "../../BattleMap/BuiltInQuivers";
import { RepresentationTemplate } from "./RepresentationTypes";
import { viewTags } from "../../Editor/BuiltIns";

/** These the representations for built in quivers*/
export const builtInRepresentations = new Map<string, RepresentationTemplate>([
    [
        builtInQuivers.isBool,
        {
            elementType: viewTags.div,
            id: '',
            class: '',
            innerText: builtInQuivers.isBool,
            children: []
        }
    ]
]);
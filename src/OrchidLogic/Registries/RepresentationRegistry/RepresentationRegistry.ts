import { RepresentationTemplate } from "./RepresentationTypes";
import { builtInViewIds, viewTags } from "../../Editor/BuiltIns";

export class RepresentationRegistry {
    getDockTemplate(): RepresentationTemplate {
        return {
            id: builtInViewIds.dock,
            elementType: viewTags.div,
            class: '',
            children: []
        }
    }
}
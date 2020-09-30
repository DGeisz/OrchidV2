import { RepresentationTemplate } from "./RepresentationTypes";
import { builtInViewIds, viewTags } from "../../Editor/BuiltIns";
import {
    InstanceType,
    isDerivedInstance,
    isLeafInstance,
    isTupleInstance
} from "../InstanceRegistry/FlatInstanceTypes";

export class RepresentationRegistry {

    getRepTemplate(flatRep: InstanceType): RepresentationTemplate {
        if (isTupleInstance(flatRep)) {

        } else if (isDerivedInstance(flatRep)) {

        } else if (isLeafInstance(flatRep)) {

        }
        return {
            id: flatRep.id,
            elementType: viewTags.div,
            class: '',
            innerText: '☐',
            children: []
        }
    }

    getDockTemplate(): RepresentationTemplate {
        return {
            id: builtInViewIds.dock,
            elementType: viewTags.div,
            class: '',
            children: []
        }
    }
}
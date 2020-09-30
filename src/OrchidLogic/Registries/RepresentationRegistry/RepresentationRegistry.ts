import { RepresentationTemplate } from "./RepresentationTypes";
import { builtInViewIds, viewTags } from "../../Editor/BuiltIns";
import {
    InstanceType,
    isDerivedInstance,
    isLeafInstance,
    isTupleInstance
} from "../InstanceRegistry/FlatInstanceTypes";
import { idSeparator, idSuffixes} from "./RepresentationConstants";

export class RepresentationRegistry {

    getRepTemplate(flatRep: InstanceType): RepresentationTemplate {
        if (isTupleInstance(flatRep)) {

        } else if (isDerivedInstance(flatRep)) {
            console.log('------ &&&&&&&&&&&&&&& ================ \n\n');
            return {
                id: flatRep.id,
                elementType: viewTags.div,
                class: '',
                children: [
                    {
                        id: [flatRep.id, idSuffixes.instanceHolder].join(idSeparator),
                        elementType: viewTags.div,
                        class: '',
                        children: [
                            {
                                id: [flatRep.id, idSuffixes.map].join(idSeparator),
                                elementType: viewTags.div,
                                class: '',
                                children: [
                                    this.getRepTemplate(flatRep.map)
                                ]
                            },
                            {
                                id: '',
                                elementType: viewTags.div,
                                class: '',
                                innerText: '(',
                                children: []
                            },
                            {
                                id: [flatRep.id, idSuffixes.arg].join(idSeparator),
                                elementType: viewTags.div,
                                class: '',
                                children: [
                                    this.getRepTemplate(flatRep.arg)
                                ]
                            },
                            {
                                id: '',
                                elementType: viewTags.div,
                                class: '',
                                innerText: ')',
                                children: []
                            }
                        ]
                    },
                    {
                        id: [flatRep.id, idSuffixes.instanceInput].join(idSeparator),
                        elementType: viewTags.div,
                        class: '',
                        innerText: '☐',
                        children: []
                    }
                ]
            }

        } else if (isLeafInstance(flatRep)) {

        }
        return {
            id: flatRep.id,
            elementType: viewTags.div,
            class: '',
            children: [
                {
                    id: [flatRep.id, idSuffixes.instanceHolder].join(idSeparator),
                    elementType: viewTags.div,
                    class: '',
                    children: []
                },
                {
                    id: [flatRep.id, idSuffixes.instanceInput].join(idSeparator),
                    elementType: viewTags.div,
                    class: '',
                    innerText: '☐',
                    children: []
                }
            ]
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
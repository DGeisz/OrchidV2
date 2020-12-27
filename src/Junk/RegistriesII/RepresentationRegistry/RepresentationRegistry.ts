import { RepresentationTemplate } from "./RepresentationTypes";
import { builtInViewIds, viewTags } from "../../../OrchidLogic/Editor/BuiltIns";
import {
    InstanceType,
    isDerivedInstance,
    isLeafInstance,
    isTupleInstance
} from "../InstanceRegistry/FlatInstanceTypes";
import { idSeparator, idSuffixes} from "./RepresentationConstants";
import { builtInRepresentations } from "./BuiltInRepresentations";

export class RepresentationRegistry {

    private leafRepresentations: Map<string, RepresentationTemplate>;

    constructor() {
        this.leafRepresentations = new Map<string, RepresentationTemplate>(builtInRepresentations);
    }


    getRepTemplate(flatRep: InstanceType): RepresentationTemplate {
        if (isTupleInstance(flatRep)) {

        } else if (isDerivedInstance(flatRep)) {
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
                                class: 'parenthesis',
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
                                class: 'parenthesis',
                                innerText: ')',
                                children: []
                            }
                        ]
                    },
                    {
                        id: [flatRep.id, idSuffixes.instanceInput].join(idSeparator),
                        elementType: viewTags.div,
                        class: '',
                        innerText: '',
                        children: []
                    }
                ]
            }

        } else if (isLeafInstance(flatRep)) {
            const iOfTemplate = this.leafRepresentations.get(flatRep.iOf);

            if (!iOfTemplate) {
                throw new Error("No template for iOf of current leaf instance!");
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
                        children: [iOfTemplate]
                    },
                    {
                        id: [flatRep.id, idSuffixes.instanceInput].join(idSeparator),
                        elementType: viewTags.div,
                        class: '',
                        children: []
                    }
                ]
            }
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
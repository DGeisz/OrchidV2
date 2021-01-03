import { FeatureGrouping, FeatureGroupingRep } from "./FeatureGrouping";

/**
 * A Selective Feature Grouping is a FG in which one or more of
 * the features are valid.  This is essentially
 * a first-order structure describing a chain of "or" statements
 */
export class Selective extends FeatureGrouping {

}

export interface SelectiveRep extends FeatureGroupingRep {
    featureGroupingType: 'selective';
}

export function isSelectiveRep(rep: FeatureGroupingRep): rep is SelectiveRep {
    return rep.featureGroupingType === 'selective';
}

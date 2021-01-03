import { FeatureGrouping, FeatureGroupingRep } from "./FeatureGrouping";

/**
 * A Composite Feature Grouping is a FG in which all
 * the features are simultaneously valid.  This is essentially
 * a first-order structure describing a chain of "and" statements
 */
export class Composite extends FeatureGrouping {}

export interface CompositeRep extends FeatureGroupingRep {
    featureGroupingType: 'composite';
}

export function isCompositeRep(rep: FeatureGroupingRep): rep is CompositeRep {
    return rep.featureGroupingType === 'composite';
}
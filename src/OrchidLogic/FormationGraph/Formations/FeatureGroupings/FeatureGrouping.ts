import { Feature, FeatureRep } from "../Feature/Feature";
import { StructureRep } from "../../StructureReps";

/**
 * A feature grouping is essentially a sequences of features
 * grouped together with "and" or "or" statements.  These are
 * essentially used to organize features in a manner that clearly
 * indicates which are simultaneously valid.
 */
export class FeatureGrouping {
    private features: Feature[]
}

export interface FeatureGroupingRep extends StructureRep {
    type: 'featureGrouping';
    featureGroupingType: string;
    features: FeatureRep[];
}

export function isFeatureGroupingRep(rep: StructureRep): rep is FeatureGroupingRep {
    return rep.type === 'featureGrouping';
}



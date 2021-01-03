import { FeatureGrouping, FeatureGroupingRep } from "../FeatureGroupings/FeatureGrouping";
import { Formation, FormationRep } from "../Formation";
import { Construction, ConstructionRep } from "../Construction/Construction";
import { Progression, ProgressionRep } from "./Progression/Progression";
import { StructureRep } from "../../StructureReps";

/**
 * A feature is essentially one aspect of a formation.
 * More specifically, a feature can be a FeatureGrouping,
 * a Formation, a Construction, or a Progression
 */
export class Feature {
    /** Feature possibilities */
    private featureGrouping: FeatureGrouping | null;
    private formation: Formation | null;
    private construction: Construction | null;
    private progression: Progression | null;
}

export interface FeatureRep extends StructureRep {
    type: 'feature';
    structure: FeatureGroupingRep | FormationRep | ConstructionRep | ProgressionRep;
}

export function isFeatureRep(rep: StructureRep): rep is FeatureRep {
    return rep.type === 'feature';
}
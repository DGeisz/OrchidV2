import { BattleMap } from "./BattleOps/BattleMap";
import { BattleTech } from "./BattleOps/BattleTech";
import { TyperSupreme } from "./BattleOps/TyperSupreme";
import { FeatureGrouping, FeatureGroupingRep } from "./FeatureGroupings/FeatureGrouping";
import { StructureRep } from "../StructureReps";

/**
 * A formation is the fundamental structure in Orchid.  It creates a scope
 * for the introduction of new symbols, it describes the constraints on those
 * symbols, and provides a manner for deriving or constructing the properties
 * that follow for symbols obeying these constraints
 * */
export class Formation {
    /** Battle Ops */
    private readonly battleMap: BattleMap;
    private readonly battleTech: BattleTech;
    private readonly typerSupreme: TyperSupreme;

    /** Features */
    private constraints: FeatureGrouping;
    private properties: FeatureGrouping;

    constructor() {
        this.battleMap = new BattleMap();
        this.battleTech = new BattleTech(this.battleMap);
        this.typerSupreme = new TyperSupreme(this.battleMap);
    }
}


export interface FormationRep extends StructureRep {
    type: 'formation';
    formationType: string; // The formation type, ie Universal, Existential, etc
    constraints: FeatureGroupingRep;
    properties: FeatureGroupingRep;
}

export function isFormationRep(rep: StructureRep): rep is FormationRep {
    return rep.type === 'formation';
}
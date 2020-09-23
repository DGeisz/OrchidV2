import { Dock } from "./Dock";
import { RepresentationEngine } from "./RepresentationEngine";
import { PageRegistry } from "../Registries/PageRegistry/PageRegistry";

export class EditorComplex {
    private readonly dock: Dock;
    private readonly representationEngine: RepresentationEngine;
    private readonly pageRegistry: PageRegistry;

    constructor() {
        this.pageRegistry = new PageRegistry();
        this.representationEngine = new RepresentationEngine(this.pageRegistry.getFlatPage());
        this.dock = new Dock(this.pageRegistry.getCurrentInstanceId(), this);
    }

    getRepresentationEngine(): RepresentationEngine {
        return this.representationEngine;
    }

    getDock(): Dock {
        return this.dock;
    }
}










// import { Dock } from "./Dock";
// import { TermRegistry } from "../../Junk/Registries/TermRegistry/TermRegistry";
// import { RuleRegistry } from "../../Junk/Registries/RuleRegistry/RuleRegistry";
// import { TermAccessorRegistry } from "../../Junk/Registries/TermAccessorRegistry/TermAccessorRegistry";
// import { RepresentationRegistry } from "../../Junk/Registries/RepresentationRegistry/RepresentationRegistry";
// import { EquationRegistry } from "../../Junk/Registries/EquationRegistry/EquationRegistry";
// import { RepresentationEngine } from "./RepresentationEngine";
//
// /**
//  * The editor complex is the overlord of the
//  * operation. It keeps track of all different structures
//  * and terms that are in play, manages the dock, and essentially
//  * manages all "model, controller" operations
//  */
// export class EditorComplex {
//
//     private readonly dock: Dock;
//     private readonly termRegistry: TermRegistry;
//     private readonly ruleRegistry: RuleRegistry;
//     private readonly termAccessorRegistry: TermAccessorRegistry;
//     private readonly representationRegistry: RepresentationRegistry;
//     private readonly equationRegistry: EquationRegistry;
//     private readonly representationEngine: RepresentationEngine;
//
//
//     constructor() {
//         this.termRegistry = new TermRegistry();
//         this.ruleRegistry = new RuleRegistry();
//         this.termAccessorRegistry = new TermAccessorRegistry();
//         this.representationRegistry = new RepresentationRegistry();
//         this.equationRegistry = new EquationRegistry();
//         this.representationEngine = new RepresentationEngine(this.equationRegistry.getFlatPage(), this);
//
//         this.dock = new Dock(this.equationRegistry.getCurrentLineId(), this);
//     }
//
//     /**
//      * Attempts to commit a sequence.  First return arg is
//      * whether the commit was successful.  Second return arg
//      * is the id of the active socket
//      */
//     commitSequence(seq: string): [boolean, string] {
//         if (this.equationRegistry.isValidInput(seq)) {
//             const currSocketId = this.equationRegistry.getCurrentSocketId();
//             const flatRep = this.equationRegistry.commitSeqReturnFlat(seq);
//
//             console.log("Midway!", currSocketId, flatRep);
//
//             this.representationEngine.removeDock(currSocketId);
//             this.representationEngine.appendEquationRepresentation(currSocketId, flatRep);
//
//             const newSocketId = this.equationRegistry.getCurrentSocketId();
//
//             return [true, newSocketId];
//         }
//         return [false, ''];
//     }
//
//     getRepresentationEngine(): RepresentationEngine {
//         return this.representationEngine;
//     }
//
//     getRepresentationRegistry(): RepresentationRegistry {
//         return this.representationRegistry;
//     }
//
//     getEquationRegistry(): EquationRegistry {
//         return this.equationRegistry;
//     }
//
//     getDock(): Dock {
//         return this.dock;
//     }
// }
import { EquationPage } from "../Registries/EquationRegistry/EquationTypes";
import { EditorComplex } from "./EditorComplex";

/**
 * The representation engine is responsible
 * for translating term representation JSON
 * formats into html for the user to see
 */
export class RepresentationEngine {

    private readonly editorComplex: EditorComplex;

    constructor(initPage: EquationPage, initSocketId: string, editorComplex: EditorComplex) {
        this.editorComplex = editorComplex;
    }

    
}
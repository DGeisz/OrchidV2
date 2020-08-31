import { Dock } from "./Dock";
import { LineSocket } from "../Socket/LineSocket";

/**
 * The editor complex is the overlord of the
 * operation. It keeps track of all different structures
 * and terms that are in play, manages the dock, and essentially
 * manages all "model, controller" operations
 */
export class EditorComplex {

    private readonly dock: Dock;
    private lines: LineSocket[] = [];
    private currentLine: LineSocket;

    constructor() {
        this.currentLine = new LineSocket("page", 0);
        this.lines.push(this.currentLine);

        this.dock = new Dock(this.currentLine);
    }

    getDock(): Dock {
        return this.dock;
    }
}
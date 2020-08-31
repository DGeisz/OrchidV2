import { Dock } from "./Dock";
import { LineSocket } from "../Sockets/LineSocket";

export class EditorComplex {

    private readonly dock: Dock;
    private lines: LineSocket[] = [];
    private currentLine: LineSocket;

    constructor() {
        this.currentLine = new LineSocket("page", 0);
        console.log("second");
        this.lines.push(this.currentLine);

        this.dock = new Dock(this.currentLine);
    }

    getDock(): Dock {
        return this.dock;
    }
}
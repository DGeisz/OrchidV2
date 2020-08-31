import { Socket } from "./Socket";

export class LineSocket extends Socket {

    private index: number;

    constructor(domParentId: string, index: number) {
        super(domParentId);
        this.index = index;

        let thisLine = document.createElement("div");
        thisLine.setAttribute("id", this.id);
        thisLine.setAttribute("class", "line");

        const parent = document.getElementById(this.domParentId);
        parent.appendChild(thisLine);
        console.log("first");
    }
}
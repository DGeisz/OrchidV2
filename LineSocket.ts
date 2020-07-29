import {v4} from 'uuid';
import { Socket } from "./Socket";

export class LineSocket extends Socket {

    private index: number;

    constructor(parentId: string, index: number) {
        super();
        this.index = index;

        let thisLine = document.createElement("div");
        thisLine.setAttribute("id", this.id);
        thisLine.setAttribute("class", "line");

        let m = new Map();

        /*TODO: Remove dev*/
        // let dock = document.createElement("div");
        // dock.setAttribute("id", "dock");
        // thisLine.appendChild(dock);

        const parent = document.getElementById(parentId);
        parent.appendChild(thisLine);
        console.log("first");
    }
}
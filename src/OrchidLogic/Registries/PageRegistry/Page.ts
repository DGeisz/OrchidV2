import {v4} from 'uuid';
import { PageType } from "../InstanceRegistry/FlatInstanceTypes";
import { Line } from "./Line";

export class Page {
    private lines: Line[]; //List of lines that comprise the page
    private currentLine: Line;

    private readonly id: string;

    constructor() {
        this.id = v4();
    }

    getId(): string {
        return this.id
    }

    getCurrentLine(): Line {
        return this.currentLine;
    }

    getFlatPage(): PageType {
        const flatPage: PageType = [];

        this.lines.forEach((line: Line) => {
            flatPage.push(line.getFlatLine());
        });

        return flatPage;
    }

    getCurrentInstanceId(): string {
        return this.currentLine.getCurrentInstance().getId();
    }
}
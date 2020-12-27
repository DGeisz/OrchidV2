import {v4} from 'uuid';
import { PageType } from "../InstanceRegistry/FlatInstanceTypes";
import { Line } from "./Line";
import { BattleMap } from "../../BattleMap/BattleMap";

export class Page {
    private lines: Line[]; //List of lines that comprise the page
    private currentLine: Line;
    private readonly id: string;

    private readonly battleMap: BattleMap;

    constructor(battleMap: BattleMap) {
        this.id = v4();
        this.battleMap = battleMap;
        this.currentLine = new Line(this.battleMap);

        this.lines = [this.currentLine];
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
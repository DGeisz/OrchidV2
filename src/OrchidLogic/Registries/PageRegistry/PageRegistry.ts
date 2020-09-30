import { Page } from "./Page";
import { PageType } from "../InstanceRegistry/FlatInstanceTypes";
import { Instance } from "../InstanceRegistry/Instance";
import { BattleMap } from "../../BattleMap/BattleMap";

export class PageRegistry {
    private pageMap: Map<string, Page>;
    private currentPage: Page;

    private readonly battleMap: BattleMap;

    constructor(battleMap: BattleMap) {
        this.battleMap = battleMap;
        this.pageMap = new Map<string, Page>();
        this.currentPage = new Page(this.battleMap);

        this.pageMap.set(this.currentPage.getId(), this.currentPage);
    }

    getFlatPage(): PageType {
        return this.currentPage.getFlatPage();
    }

    getCurrentPage(): Page {
        return this.currentPage;
    }

    getCurrentInstance(): Instance {
        return this.currentPage.getCurrentLine().getCurrentInstance();
    }

    getCurrentInstanceId(): string {
        return this.currentPage.getCurrentInstanceId();
    }
}
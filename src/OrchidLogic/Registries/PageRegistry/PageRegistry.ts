import { Page } from "./Page";
import { PageType } from "../InstanceRegistry/FlatInstanceTypes";

export class PageRegistry {
    private pageMap: Map<string, Page>;
    private currentPage: Page;

    constructor() {
        this.pageMap = new Map<string, Page>();
        this.currentPage = new Page();

        this.pageMap.set(this.currentPage.getId(), this.currentPage);
    }

    getFlatPage(): PageType {
        return this.currentPage.getFlatPage();
    }

    getCurrentInstanceId(): string {
        return this.currentPage.getCurrentInstanceId();
    }
}
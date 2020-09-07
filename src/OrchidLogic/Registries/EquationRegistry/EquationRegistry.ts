import { EquationPage, SocketInstance } from "./EquationTypes";
import { LineSocket } from "./Socket/LineSocket";

/**
 * Abstract representation of all equations on
 * the page
 */
export class EquationRegistry{

    private currentPage: LineSocket[];
    private currentLine: LineSocket;

    constructor(initPage?: EquationPage) {
        if (initPage) {
           //TODO: Impl what happens when we have an initial page
        } else {
            this.currentLine = new LineSocket();
            this.currentPage = [this.currentLine];
        }
    }

    getFlatPage(): SocketInstance[] {
        let flatPage: SocketInstance[] = [];

        this.currentPage.forEach(line => {
            flatPage.push(line.toFlatRep());
        });

        return flatPage;
    }
}
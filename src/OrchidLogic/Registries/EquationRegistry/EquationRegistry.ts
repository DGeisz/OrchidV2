import { EquationPage, SocketInstance } from "./EquationTypes";
import { LineSocket } from "./Socket/LineSocket";
import { Socket } from "./Socket/Socket";
import { builtInLineStarters } from "../../Editor/BuiltIns";

/**
 * Abstract representation of all equations on
 * the page
 */
export class EquationRegistry{

    private currentPage: LineSocket[];
    private currentLine: LineSocket;
    private currentSocket: Socket;

    constructor(initPage?: EquationPage) {
        if (initPage) {
           //TODO: Impl what happens when we have an initial page
        } else {
            this.currentLine = new LineSocket();
            this.currentSocket = this.currentLine;
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

    getCurrentLineId(): string {
        return this.currentLine.getId();
    }

    isValidInput(input: string): boolean {
        console.log("Yang")
        if (this.currentSocket instanceof LineSocket) {
            console.log("Ypte")
            return input in builtInLineStarters;
        }
        return false;
    }
}
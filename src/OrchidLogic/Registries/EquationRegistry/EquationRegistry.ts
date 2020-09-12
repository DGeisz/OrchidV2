import { EquationNodeInstance, EquationPage, SocketInstance } from "./EquationTypes";
import { LineSocket } from "./Socket/LineSocket";
import { Socket } from "./Socket/Socket";
import { builtInLineStarters } from "../../Editor/BuiltIns";
import { stripSlash } from "../../Editor/utils/functions";
import { SetDefStructure } from "./Structure/SetDefStructure";

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

    isValidInput(rawInput: string): boolean {
        if (this.currentSocket instanceof LineSocket) {
            const [isAccessor, input] = stripSlash(rawInput);
            if (isAccessor) {
                return input in builtInLineStarters;
            }
            return false;
        }
        return false;
    }

    /**
     * Commits the structure corresponding to this sequence into
     * the current equation, and returns the information necessary
     * to brew the representation
     */
    commitSeqReturnFlat(rawSeq: string): EquationNodeInstance {
        if (this.isValidInput(rawSeq)) {
            const [_, seq] = stripSlash(rawSeq);
            if (this.currentSocket instanceof LineSocket) {
                switch (seq) {
                    case builtInLineStarters.set:
                        console.log("Inside set!");
                        const newSet = new SetDefStructure(this.currentSocket);
                        this.currentSocket = this.currentSocket.getNextSocket();
                        return newSet.toFlatRep();

                    case builtInLineStarters.term:
                }
            }
        }
        return {
            id: '',
            type: 'set'
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

    getCurrentSocketId(): string {
        return this.currentSocket.getId();
    }


}
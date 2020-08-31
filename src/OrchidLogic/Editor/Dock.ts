import { Socket } from "../Socket/Socket";
import { EditorComplex } from "./EditorComplex";
import { StatusClass } from "../Status/statusMap";

/**
 * The Dock is the entity that "docks" itself
 * to a socket, takes input from a user, determines
 * whether that input corresponds to a structure
 * that is valid within the given socket, either for
 * a mathematical or managerial reason, and coordinates the
 * process of translating that textual input into a structure
 * both from the perspective of a TypeScript object, but also
 * as pure html rendered in the app
 */
export class Dock {
    private socketId: string;
    private socket: Socket;

    private editorComplex: EditorComplex;

    private input: string;
    private cursorPosition: number;
    private cursorBlink: NodeJS.Timeout;

    constructor(initSocket: Socket) {
        this.socket = initSocket;
        this.socketId = initSocket.getId();
        this.input = '';
        this.cursorPosition = 0;

        let dockElement = document.createElement("div");
        dockElement.setAttribute("id", "dock");

        let currElement = document.getElementById(this.socketId);
        currElement.appendChild(dockElement);
        this.setInnerHtml();
    }

    /**
     * Restarts the cursor blink
     */
    private restartCursorBlink() {
        clearTimeout(this.cursorBlink);
        document.getElementById("cursor").style.visibility = 'visible';
        this.cursorBlink = setInterval(() => {
            let cursor = document.getElementById("cursor");
            cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
        }, 530)
    }


    /**
     * This sets the inner html of the dock to match
     * the input/cursor position
     */
    private setInnerHtml() {
        let dock = document.getElementById("dock");

        while (dock.firstChild) {
            dock.removeChild(dock.lastChild);
        }

        const isValidInput = this.socket.isValidSequence(this.input);

        const statusClass = isValidInput ? StatusClass.valid : StatusClass.inProgress;
        console.log("Puny", statusClass)

        let input1 = document.createElement("div");
        input1.setAttribute("class", ["input", statusClass].join(' '));
        input1.innerText = this.input.slice(0, this.cursorPosition);
        let cursorContainer = document.createElement("div");
        cursorContainer.setAttribute("id", "cursorContainer");
        let cursor = document.createElement("div");
        cursor.setAttribute("id", "cursor");
        cursorContainer.appendChild(cursor);
        let input2 = document.createElement("div");
        input2.setAttribute("class", ["input", statusClass].join(' '));
        input2.innerText = this.input.slice(this.cursorPosition);

        dock.appendChild(input1);
        dock.appendChild(cursorContainer);
        dock.appendChild(input2);

        this.restartCursorBlink();
    }

    /**
     * Takes in a single character into
     * the dock
     */
    intakeCharacter(char: string) {
        this.input = [this.input.slice(0, this.cursorPosition), char, this.input.slice(this.cursorPosition)].join('');
        this.cursorPosition++;
        this.setInnerHtml();
    }

    /**
     * Deletes character from the dock
     */
    deleteCharacter() {
        this.input = [this.input.slice(0, this.cursorPosition - 1), this.input.slice(this.cursorPosition)].join('');
        if (this.cursorPosition) {
            this.cursorPosition--;
        }
        this.setInnerHtml();
    }

    /**
     * Goes left by one key (used when arrow key is pressed)
     */
    goLeft() {
        if (this.cursorPosition) {
            this.cursorPosition--;
            this.setInnerHtml();
        }
    }

    /**
     * Goes right by one key (used when arrow key is pressed)
     */
    goRight() {
        if (this.cursorPosition < this.input.length) {
            this.cursorPosition++;
            this.setInnerHtml();
        }
    }

    /**
     * Sets the socket id of the dock
     */
    setSocketId(socketId: string) {
        this.socketId = socketId;
    }
}


import { EditorComplex } from "./EditorComplex";
import { RepresentationEngine } from "./RepresentationEngine";

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

    private editorComplex: EditorComplex;
    private representationEngine: RepresentationEngine;

    private input: string = '';
    private cursorPosition: number = 0;

    constructor(initSocketId: string, editorComplex: EditorComplex) {
        this.socketId = initSocketId;
        this.editorComplex = editorComplex;
        this.representationEngine = editorComplex.getRepresentationEngine();
        this.representationEngine.dockDockInView(initSocketId);
    }

    intakeCharacter(char: string) {
        this.input = [this.input.slice(0, this.cursorPosition), char, this.input.slice(this.cursorPosition)].join('');
        this.cursorPosition++;
        this.representationEngine.renderInputSeq(this.input, this.cursorPosition);
    }

    /**
     * Deletes character from the dock
     */
    deleteCharacter() {
        this.input = [this.input.slice(0, this.cursorPosition - 1), this.input.slice(this.cursorPosition)].join('');
        if (this.cursorPosition) {
            this.cursorPosition--;
            this.representationEngine.renderInputSeq(this.input, this.cursorPosition);
        }
    }

    /**
     * Goes left by one key (used when arrow key is pressed)
     */
    goLeft() {
        if (this.cursorPosition > 0) {
            this.cursorPosition--;
            this.representationEngine.renderInputSeq(this.input, this.cursorPosition);
        }
    }

    /**
     * Goes right by one key (used when arrow key is pressed)
     */
    goRight() {
        if (this.cursorPosition < this.input.length) {
            this.cursorPosition++;
            this.representationEngine.renderInputSeq(this.input, this.cursorPosition);
        }
    }

    /**
     * Attempts a sequence commit with the bois upstairs
     */
    commitSequence() {
        //TODO: Implement
    }
}


//
// export class Dock {
//     private socket: Socket;
//
//     private editorComplex: EditorComplex;
//
//     private input: string = '';
//     private cursorPosition: number = 0;
//     private cursorBlink: NodeJS.Timeout;
//
//     constructor(initSocket: Socket) {
//         this.socket = initSocket;
//         this.dockOnSocketHtml();
//     }
//
//     /**
//      * Restarts the cursor blink
//      */
//     private restartCursorBlink() {
//         clearTimeout(this.cursorBlink);
//         document.getElementById("cursor").style.visibility = 'visible';
//         this.cursorBlink = setInterval(() => {
//             let cursor = document.getElementById("cursor");
//             cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
//         }, 530)
//     }
//
//
//     /**
//      * This sets the inner html of the dock to match
//      * the input/cursor position
//      */
//     private setInnerHtml(valid: boolean = true) {
//         let dock = document.getElementById("dock");
//
//         while (dock.firstChild) {
//             dock.removeChild(dock.lastChild);
//         }
//
//         const isValidInput = this.socket.isValidSequence(this.input);
//
//         let statusClass: string;
//         if (valid) {
//             statusClass = isValidInput ? StatusClass.valid : StatusClass.inProgress;
//         } else {
//             statusClass = StatusClass.invalid;
//         }
//
//         let input1 = document.createElement("div");
//         input1.setAttribute("class", ["input", statusClass].join(' '));
//         input1.innerText = this.input.slice(0, this.cursorPosition);
//         let cursorContainer = document.createElement("div");
//         cursorContainer.setAttribute("id", "cursorContainer");
//         let cursor = document.createElement("div");
//         cursor.setAttribute("id", "cursor");
//         cursorContainer.appendChild(cursor);
//         let input2 = document.createElement("div");
//         input2.setAttribute("class", ["input", statusClass].join(' '));
//         input2.innerText = this.input.slice(this.cursorPosition);
//
//         dock.appendChild(input1);
//         dock.appendChild(cursorContainer);
//         dock.appendChild(input2);
//
//         this.restartCursorBlink();
//     }
//
//     /**
//      * Removes the dock from html
//      */
//     removeDockFromSocketHtml() {
//         clearTimeout(this.cursorBlink);
//         const socketElement = document.getElementById(this.socket.getId());
//         while (socketElement.firstChild) {
//             socketElement.removeChild(socketElement.lastChild);
//         }
//     }
//
//     /**
//      * Adds the dock to the currently docked socket
//      */
//     dockOnSocketHtml() {
//         const socketElement = document.getElementById(this.socket.getId());
//         socketElement.innerText = '';
//
//         let dockElement = document.createElement("div");
//         dockElement.setAttribute("id", "dock");
//         socketElement.appendChild(dockElement);
//         this.setInnerHtml();
//     }
//
//     /**
//      * Takes in a single character into
//      * the dock
//      */
//     intakeCharacter(char: string) {
//         this.input = [this.input.slice(0, this.cursorPosition), char, this.input.slice(this.cursorPosition)].join('');
//         this.cursorPosition++;
//         this.setInnerHtml();
//     }
//
//     /**
//      * Deletes character from the dock
//      */
//     deleteCharacter() {
//         this.input = [this.input.slice(0, this.cursorPosition - 1), this.input.slice(this.cursorPosition)].join('');
//         if (this.cursorPosition) {
//             this.cursorPosition--;
//         }
//         this.setInnerHtml();
//     }
//
//     /**
//      * If the sequence is valid, commits the sequence.
//      * Otherwise, sets the sequence as invalid
//      */
//     commitSequence() {
//         if (this.socket.isValidSequence(this.input)) {
//             this.removeDockFromSocketHtml();
//             this.socket.commitSequence(this.input);
//             this.socket = this.socket.getNextSocket();
//             this.input = "";
//             this.cursorPosition = 0;
//             this.dockOnSocketHtml();
//         } else {
//             this.setInnerHtml(false);
//         }
//     }
//
//     /**
//      * Goes left by one key (used when arrow key is pressed)
//      */
//     goLeft() {
//         if (this.cursorPosition) {
//             this.cursorPosition--;
//             this.setInnerHtml();
//         }
//     }
//
//     /**
//      * Goes right by one key (used when arrow key is pressed)
//      */
//     goRight() {
//         if (this.cursorPosition < this.input.length) {
//             this.cursorPosition++;
//             this.setInnerHtml();
//         }
//     }
// }


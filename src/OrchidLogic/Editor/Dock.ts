import { EditorComplex } from "./EditorComplex";
import { RepresentationEngine, StatusClass } from "./RepresentationEngine";
import { Instance } from "../Registries/InstanceRegistry/Instance";
import { stripSlash } from "../utils/functions";
import { builtInAccessors } from "./BuiltIns";


interface ParsedInput {
    seq: string;
    isDef: boolean; //True if input is not proceeded by a slash
    definesArrow?: boolean; //True if seq defines a map, like /f(,) or /f()
    argIsTuple?: boolean; //True if map arg is a tuple, so true for /f(,), false for /f()
    isEmptyArrow?: boolean; //True if input is /->
    isEmptyTuple?: boolean; //True if input is /[]
    definesTuple?: boolean; //True if input takes the form /[int], ie /[4]
    tupleSize?: number; //Number in defines tuple input, so /[4] maps to 4
}

/**
 * The Dock is the abstraction that
 * handles user input into a particular
 * socket.  The representationEngine of course
 * does the representing, but the dock coordinates
 * what the repEngine projects onto the view
 */
export class Dock {
    private editorComplex: EditorComplex;
    private representationEngine: RepresentationEngine;

    private currentInstance: Instance;
    private input: string = '';
    private cursorPosition: number = 0;

    constructor(instance: Instance, editorComplex: EditorComplex) {
        this.currentInstance = instance;
        this.editorComplex = editorComplex;
        this.representationEngine = editorComplex.getRepresentationEngine();
        this.representationEngine.dockDockInView(this.currentInstance.getId());
        this.representationEngine.renderInputSeq(this.input, this.cursorPosition, this.getInputStatus(this.input));
    }

    intakeCharacter(char: string): void {
        const parsedInput = Dock.parseInput(this.input);
        if (!this.input ) {
            console.log("Didn't make it");
            if (!/[a-zA-Z\/]/.test(char)) {
                return;
            }
        } else if (parsedInput.isDef && !/[a-zA-Z0-9]/.test(char)) {
            return;
        } else if (!/[a-zA-Z0-9(),\->\[\]]/.test(char)) {
            return;
        }
        this.input = [this.input.slice(0, this.cursorPosition), char, this.input.slice(this.cursorPosition)].join('');
        this.cursorPosition++;
        this.representationEngine.renderInputSeq(this.input, this.cursorPosition, this.getInputStatus(this.input));
    }

    /**
     * Deletes character from the dock
     */
    deleteCharacter() {
        this.input = [this.input.slice(0, this.cursorPosition - 1), this.input.slice(this.cursorPosition)].join('');
        if (this.cursorPosition) {
            this.cursorPosition--;
            this.representationEngine.renderInputSeq(this.input, this.cursorPosition, this.getInputStatus(this.input));
        }
    }

    /**
     * Goes left by one key (used when arrow key is pressed)
     */
    goLeft() {
        if (this.cursorPosition > 0) {
            this.cursorPosition--;
            this.representationEngine.renderInputSeq(this.input, this.cursorPosition, this.getInputStatus(this.input));
        }
    }

    /**
     * Goes right by one key (used when arrow key is pressed)
     */
    goRight() {
        if (this.cursorPosition < this.input.length) {
            this.cursorPosition++;
            this.representationEngine.renderInputSeq(this.input, this.cursorPosition, this.getInputStatus(this.input));
        }
    }

    /**
     * Attempts a sequence commit with the bois upstairs
     */
    commitSequence() {
        // const [success, newId] = this.editorComplex.commitSequence(this.input);
        const success = true;
        if (success) {
            this.input = '';
            this.cursorPosition = 0;
            this.representationEngine.dockDockInView(this.currentInstance.getId());
            this.representationEngine.renderInputSeq(this.input, this.cursorPosition, this.getInputStatus(this.input));
        } else {
            this.representationEngine.renderInputSeq(this.input, this.cursorPosition, this.getInputStatus(this.input));
        }
    }

    private getInputStatus(input: string): typeof StatusClass[keyof typeof StatusClass] {
        const parsedInput = Dock.parseInput(input);
        console.log("This is status", input, parsedInput)
        if (parsedInput.isDef) {
            return this.currentInstance.takesDef() ? StatusClass.valid : StatusClass.invalid;
        } else if (parsedInput.isEmptyArrow) {
            return this.currentInstance.takesEmptyArrow() ? StatusClass.valid : StatusClass.invalid;
        } else if (parsedInput.isEmptyTuple) {
            return this.currentInstance.takesEmptyTuple() ? StatusClass.valid : StatusClass.invalid;
        } else if (parsedInput.definesArrow) {
            return this.editorComplex.isArrowCompatible(
                parsedInput.seq, this.currentInstance.getId(), parsedInput.argIsTuple)
            ? StatusClass.valid : StatusClass.invalid;
        } else if (parsedInput.definesTuple) {
            return this.currentInstance.takesTuple(parsedInput.tupleSize)
                ? StatusClass.valid : StatusClass.invalid;
        }
        return this.editorComplex.isQuiverCompatible(
            parsedInput.seq, this.currentInstance.getId())
        ? StatusClass.valid : StatusClass.inProgress;
    }

    private static parseInput(input: string): ParsedInput {
        if (input) {
            if (input[0] === '/') {
                const stripSlash = input.substring(1);
                console.log("This is stripslash:", stripSlash);
                console.log("Yote:", Object.values(builtInAccessors));
                if (Object.values(builtInAccessors).includes(stripSlash)) {
                    return {
                        seq: stripSlash,
                        isDef: false,
                        isEmptyArrow: stripSlash === builtInAccessors.emptyArrow,
                        isEmptyTuple: stripSlash === builtInAccessors.emptyTuple
                    }
                } else if (stripSlash.substring(stripSlash.length - 2, stripSlash.length) === '()') {
                    return {
                        seq: stripSlash,
                        isDef: false,
                        definesArrow: true,
                        argIsTuple: false
                    }
                } else if (stripSlash.substring(stripSlash.length - 3, stripSlash.length) === '(,)') {
                    return {
                        seq: stripSlash,
                        isDef: false,
                        definesArrow: true,
                        argIsTuple: false
                    }
                } else if (
                    stripSlash[0] === '['
                    && stripSlash[stripSlash.length - 1] === ']'
                    && !isNaN(Number(stripSlash.substring(1, stripSlash.length - 1)))
                ) {
                    return {
                        seq: stripSlash,
                        isDef: false,
                        definesTuple: true,
                        tupleSize: parseInt(stripSlash.substring(1, stripSlash.length - 1))
                    }
                }
                return {
                    seq: stripSlash,
                    isDef: false
                }
            } else {
                return {
                    seq: input,
                    isDef: true
                }
            }
        } else {
            return {
                seq: input,
                isDef: false
            }
        }
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


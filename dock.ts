export class Dock {
    private socketId: string;
    private input: string;

    private cursorPosition: number;
    private cursorBlink: NodeJS.Timeout;

    constructor(initSocketId: string) {
        this.socketId = initSocketId;
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

        let input1 = document.createElement("div");
        input1.setAttribute("class", "input");
        input1.innerText = this.input.slice(0, this.cursorPosition);
        let cursorContainer = document.createElement("div");
        cursorContainer.setAttribute("id", "cursorContainer");
        let cursor = document.createElement("div");
        cursor.setAttribute("id", "cursor");
        cursorContainer.appendChild(cursor);
        let input2 = document.createElement("div");
        input2.setAttribute("class", "input");
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


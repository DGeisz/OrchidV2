import { EquationNodeType, EquationPage, isSocket } from "../Registries/EquationRegistry/EquationTypes";
import { EditorComplex } from "./EditorComplex";
import { RepresentationRegistry } from "../Registries/RepresentationRegistry/RepresentationRegistry";
import { RepresentationTemplate } from "../Registries/RepresentationRegistry/RepresentationTypes";

/**
 * The representation engine is responsible
 * for translating term representation JSON
 * formats into html for the user to see
 */
export class RepresentationEngine {

    private readonly editorComplex: EditorComplex;
    private readonly representationRegistry: RepresentationRegistry;

    private cursorBlink: NodeJS.Timeout;

    constructor(initPage: EquationPage, editorComplex: EditorComplex) {
        this.editorComplex = editorComplex;
        this.representationRegistry = editorComplex.getRepresentationRegistry();

        for (let lineSocket of initPage) {
            this.appendEquationRepresentation('page', lineSocket);
        }
    }

    appendEquationRepresentation(parentId: string, node: EquationNodeType) {
        if (isSocket(node)) {
            this.recursivelyAppendDom(
                parentId,
                this.representationRegistry.getSocketTemplate(node)
            );

            node.childStructure && this.appendEquationRepresentation(node.id, node.childStructure);
        }
    }

    private recursivelyAppendDom(parentId: string, template: RepresentationTemplate) {
        const newElement = document.createElement(template.elementType);
        newElement.setAttribute('id', template.id);
        newElement.setAttribute('class', template.class);

        const parentElement = document.getElementById(parentId);
        parentElement.appendChild(newElement);

        for (let childTemplate of template.children) {
            this.recursivelyAppendDom(template.id, childTemplate);
        }
    }


    /**
     * Adds the dock view element to the page within the
     * socket with socketId
     */
    dockDockInView(socketId: string) {
        const socketElement = document.getElementById(socketId);
        socketElement.innerText = '';

        this.recursivelyAppendDom(socketId, this.representationRegistry.getDockTemplate())
    }



    /**
     * Renders the input within the dock element
     * on the page
     */
    renderInputSeq(input: string, cursorPosition: number) {
        let dock = document.getElementById("dock");

        while (dock.firstChild) {
            dock.removeChild(dock.lastChild);
        }

        const isValidInput = this.editorComplex.isValidSequence(input);

        let statusClass = isValidInput ? StatusClass.valid : StatusClass.inProgress;

        let input1 = document.createElement("div");
        input1.setAttribute("class", ["input", statusClass].join(' '));
        input1.innerText = input.slice(0, cursorPosition);
        let cursorContainer = document.createElement("div");
        cursorContainer.setAttribute("id", "cursorContainer");
        let cursor = document.createElement("div");
        cursor.setAttribute("id", "cursor");
        cursorContainer.appendChild(cursor);
        let input2 = document.createElement("div");
        input2.setAttribute("class", ["input", statusClass].join(' '));
        input2.innerText = input.slice(cursorPosition);

        dock.appendChild(input1);
        dock.appendChild(cursorContainer);
        dock.appendChild(input2);

        this.restartCursorBlink();
    }

    private restartCursorBlink() {
        clearTimeout(this.cursorBlink);
        document.getElementById("cursor").style.visibility = 'visible';
        this.cursorBlink = setInterval(() => {
            let cursor = document.getElementById("cursor");
            cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
        }, 530)
    }
}

export const StatusClass = {
    valid: 'valid',
    invalid: 'invalid',
    inProgress: 'inProgress'
};
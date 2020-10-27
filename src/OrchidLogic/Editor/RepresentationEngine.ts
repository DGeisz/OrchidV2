import { InstanceType, isTupleInstance, PageType } from "../Registries/InstanceRegistry/FlatInstanceTypes";
import { RepresentationTemplate } from "../Registries/RepresentationRegistry/RepresentationTypes";
import { builtInViewIds } from "./BuiltIns";
import { stripSlash } from "../utils/functions";
import { RepresentationRegistry } from "../Registries/RepresentationRegistry/RepresentationRegistry";
import { idSeparator, idSuffixes } from "../Registries/RepresentationRegistry/RepresentationConstants";
import { Instance } from "../Registries/InstanceRegistry/Instance";

export class RepresentationEngine {
    private representationRegistry: RepresentationRegistry;

    private cursorBlink: NodeJS.Timeout;

    constructor(initPage: PageType, representationRegistry: RepresentationRegistry) {
        this.representationRegistry = representationRegistry;

        for (let line of initPage) {
            this.recursivelyAppendDom(
                this.representationRegistry.getRepTemplate(line),
                builtInViewIds.page
            );
        }
    }

    populateInstance(instance: Instance) {
        console.log(this.representationRegistry.getRepTemplate(instance.getFlatRep()));
        this.recursivelyAppendDom(
            this.representationRegistry.getRepTemplate(instance.getFlatRep())
        );
    }

    private recursivelyAppendDom(template: RepresentationTemplate, parentId?: string) {
        const templateElement = document.getElementById(template.id);
        if (templateElement) {

            while(templateElement.firstChild) {
                templateElement.removeChild(templateElement.lastChild);
            }

            for (let childTemplate of template.children) {
                this.recursivelyAppendDom(childTemplate, template.id);
            }
        } else if (parentId) {
            const newElement = document.createElement(template.elementType);
            if (template.id) newElement.setAttribute('id', template.id);
            if (template.class) newElement.setAttribute('class', template.class);

            const parentElement = document.getElementById(parentId);
            parentElement.appendChild(newElement);

            if (template.innerText) {
                newElement.innerText = template.innerText;
                console.log("Appended", template.innerText, "To node!");

            } else {
                for (let childTemplate of template.children) {
                    this.recursivelyAppendDom(childTemplate, template.id);
                }
            }
        }
    }


    /**
     * Renders the input within the dock element
     * on the page
     */
    renderInputSeq(input: string, cursorPosition: number, statusClass: typeof StatusClass[keyof typeof StatusClass]) {
        let dock = document.getElementById("dock");

        while (dock.firstChild) {
            dock.removeChild(dock.lastChild);
        }

        const italic = stripSlash(input)[0] ? '' : 'italic';

        let input1 = document.createElement("div");
        input1.setAttribute("class", ["input", statusClass, italic].join(' '));
        input1.innerText = input.slice(0, cursorPosition);
        let cursorContainer = document.createElement("div");
        cursorContainer.setAttribute("id", "cursorContainer");
        let cursor = document.createElement("div");
        cursor.setAttribute("id", "cursor");
        cursorContainer.appendChild(cursor);
        let input2 = document.createElement("div");
        input2.setAttribute("class", ["input", statusClass, italic].join(' '));
        input2.innerText = input.slice(cursorPosition);

        dock.appendChild(input1);
        dock.appendChild(cursorContainer);
        dock.appendChild(input2);

        this.restartCursorBlink();
    }

    dockDockInView(instanceId: string) {
        const inputId = [instanceId, idSuffixes.instanceInput].join(idSeparator);
        const socketElement = document.getElementById(inputId);
        socketElement.innerText = '';

        this.recursivelyAppendDom(this.representationRegistry.getDockTemplate(), inputId)
    }

    removeDock(instanceId: string) {
        const socket = document.getElementById([instanceId, idSuffixes.instanceInput].join(idSeparator));
        clearTimeout(this.cursorBlink);

        while (socket.firstChild) {
            socket.removeChild(socket.lastChild);
        }
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

// import {
//     EquationNodeInstance,
//     EquationNodeShape,
//     EquationPage, isDerivedTerm, isSetDef,
//     isSocket, isTuple
// } from "../../Junk/Registries/EquationRegistry/EquationTypes";
// import { EditorComplex } from "./EditorComplex";
// import { RepresentationRegistry } from "../../Junk/Registries/RepresentationRegistry/RepresentationRegistry";
// import { RepresentationTemplate } from "../../Junk/Registries/RepresentationRegistry/RepresentationTypes";
// import { EquationRegistry } from "../../Junk/Registries/EquationRegistry/EquationRegistry";
// import { stripSlash } from "./utils/functions";
//
// /**
//  * The representation engine is responsible
//  * for translating term representation JSON
//  * formats into html for the user to see
//  */
// export class RepresentationEngine {
//
//     private readonly editorComplex: EditorComplex;
//     private readonly representationRegistry: RepresentationRegistry;
//     private readonly equationRegistry: EquationRegistry;
//
//     private cursorBlink: NodeJS.Timeout;
//
//     constructor(initPage: EquationPage, editorComplex: EditorComplex) {
//         this.editorComplex = editorComplex;
//         this.representationRegistry = editorComplex.getRepresentationRegistry();
//         this.equationRegistry = editorComplex.getEquationRegistry();
//
//         for (let lineSocket of initPage) {
//             this.appendEquationRepresentation('page', lineSocket);
//         }
//     }
//
//     appendEquationRepresentation(parentId: string, node: EquationNodeInstance) {
//
//         //Handle the most difficult case, which is if the term is derived
//         if (isDerivedTerm(node)) {
//
//             const index2IdMap = new Map<number, string>([
//                 [node.arg.index, node.arg.id],
//                 [node.map.index, node.map.id]
//             ]);
//
//             if (node.arg.childStructure && isTuple(node.arg.childStructure)) {
//
//                 for (let childNode of node.arg.childStructure.items) {
//                     index2IdMap.set(childNode.index, childNode.id);
//                 }
//
//                 const [isCustom, template] = this.representationRegistry.getMultiArgMapTemplate(node, index2IdMap);
//
//                 this.recursivelyAppendDom(parentId, template);
//
//                 if (!isCustom && node.map.childStructure) {
//                     this.appendEquationRepresentation(
//                         node.map.id,
//                         node.map.childStructure
//                     );
//                 }
//
//                 for (let childNode of node.arg.childStructure.items) {
//                     this.appendEquationRepresentation(
//                         node.id,
//                         childNode
//                     );
//                 }
//             } else {
//                 const [isCustom, template] = this.representationRegistry.getMapTemplate(node, index2IdMap);
//                 this.recursivelyAppendDom(
//                     parentId,
//                     template
//                 );
//
//                 if (!isCustom && node.map.childStructure) {
//                     this.appendEquationRepresentation(
//                         node.map.id,
//                         node.map.childStructure
//                     );
//                 }
//
//                 node.arg.childStructure && this.appendEquationRepresentation(
//                     node.arg.id,
//                     node.arg.childStructure
//                 );
//             }
//         } else if (isSocket(node)) {
//             //This case is somewhat rare because typically sockets are taken care of as part of another structure
//             this.recursivelyAppendDom(
//                 parentId,
//                 this.representationRegistry.getSocketTemplate(node)
//             );
//             node.childStructure && this.appendEquationRepresentation(node.id, node.childStructure);
//         } else if (isSetDef(node)) {
//             const index2IdMap = new Map<number, string>([[node.newSet.index, node.newSet.id]]);
//
//             this.recursivelyAppendDom(
//                 parentId,
//                 this.representationRegistry.getBuiltInTemplate(node, index2IdMap)
//             );
//
//             node.newSet.childStructure && this.appendEquationRepresentation(node.newSet.id, node.newSet.childStructure);
//         } else {
//
//         }
//     }
//
//     private recursivelyAppendDom(parentId: string, template: RepresentationTemplate) {
//         const newElement = document.createElement(template.elementType);
//         newElement.setAttribute('id', template.id);
//         newElement.setAttribute('class', template.class);
//
//         const parentElement = document.getElementById(parentId);
//         parentElement.appendChild(newElement);
//
//         if (template.innerText) {
//             newElement.innerText = template.innerText;
//             console.log("Appended", template.innerText, "To node!");
//
//         } else {
//             for (let childTemplate of template.children) {
//                 this.recursivelyAppendDom(template.id, childTemplate);
//             }
//         }
//     }
//
//
//     /**
//      * Adds the dock view element to the page within the
//      * socket with socketId
//      */
//     dockDockInView(socketId: string) {
//         const socketElement = document.getElementById(socketId);
//         socketElement.innerText = '';
//
//         this.recursivelyAppendDom(socketId, this.representationRegistry.getDockTemplate())
//     }
//
//     /**
//      * Removes the dock from a particular socket
//      */
//     removeDock(socketId: string) {
//         const socket = document.getElementById(socketId);
//         clearTimeout(this.cursorBlink);
//
//         while (socket.firstChild) {
//             socket.removeChild(socket.lastChild);
//         }
//     }
//
//
//     /**
//      * Renders the input within the dock element
//      * on the page
//      */
//     renderInputSeq(input: string, cursorPosition: number, failedCommit: boolean = false) {
//         let dock = document.getElementById("dock");
//
//         while (dock.firstChild) {
//             dock.removeChild(dock.lastChild);
//         }
//
//         const isValidInput = this.equationRegistry.isValidInput(input);
//
//
//         let statusClass;
//         if (failedCommit) {
//             statusClass = StatusClass.invalid;
//         } else {
//             statusClass = isValidInput ? StatusClass.valid : StatusClass.inProgress;
//         }
//
//         const italic = stripSlash(input)[0] ? '' : 'italic';
//
//         let input1 = document.createElement("div");
//         input1.setAttribute("class", ["input", statusClass, italic].join(' '));
//         input1.innerText = input.slice(0, cursorPosition);
//         let cursorContainer = document.createElement("div");
//         cursorContainer.setAttribute("id", "cursorContainer");
//         let cursor = document.createElement("div");
//         cursor.setAttribute("id", "cursor");
//         cursorContainer.appendChild(cursor);
//         let input2 = document.createElement("div");
//         input2.setAttribute("class", ["input", statusClass, italic].join(' '));
//         input2.innerText = input.slice(cursorPosition);
//
//         dock.appendChild(input1);
//         dock.appendChild(cursorContainer);
//         dock.appendChild(input2);
//
//         this.restartCursorBlink();
//     }
//
//     private restartCursorBlink() {
//         clearTimeout(this.cursorBlink);
//         document.getElementById("cursor").style.visibility = 'visible';
//         this.cursorBlink = setInterval(() => {
//             let cursor = document.getElementById("cursor");
//             cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
//         }, 530)
//     }
// }
//
// export const StatusClass = {
//     valid: 'valid',
//     invalid: 'invalid',
//     inProgress: 'inProgress'
// };
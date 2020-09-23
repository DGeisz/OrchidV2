const { ipcRenderer } = require('electron');
import { EditorComplex } from "./Editor/EditorComplex";
import { Controller } from "./Editor/Controller";

ipcRenderer.on('init', (event => {
    console.log("Here it is!");
    let editorComplex = new EditorComplex();
    const controller = new Controller(editorComplex.getDock());
}));

ipcRenderer.send('render-complete');

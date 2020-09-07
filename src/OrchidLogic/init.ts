const { ipcRenderer } = require('electron');
// import { ipcRenderer } from 'electron';
import { EditorComplex } from "./Editor/EditorComplex";
import { Controller } from "./Editor/Controller";

ipcRenderer.on('init', (event => {

    console.log("Here it is!");
    let editorComplex = new EditorComplex();
    let dock = editorComplex.getDock();
    const controller = new Controller(dock);

}));

ipcRenderer.send('render-complete');


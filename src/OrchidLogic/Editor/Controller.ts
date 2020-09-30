import { Dock } from "./Dock";

/**
 * As you may expect, the controller takes in key
 * strokes and sends them off to the proper places
 * to be processed
 */
export class Controller {
    constructor(dock: Dock) {
        document.addEventListener('keypress', e => {
            if (e.key.length === 1) {
                dock.intakeCharacter(e.key);
            }
        });

        document.addEventListener('keydown', (e): void => {
            switch (e.key) {
                case "Backspace":
                    console.log("th");
                    dock.deleteCharacter();
                    return;
                case "ArrowRight":
                    dock.goRight();
                    return;
                case "ArrowLeft":
                    dock.goLeft();
                    return;
                case "Enter":
                    dock.commitSequence();
                    return;
            }
        });
    }
}
console.log("everything started")

import { Dock } from "./dock";

let dock = new Dock("innerSocket");

document.addEventListener('keypress', e => {
    console.log(e.key, e.code);

    if (e.code === 'Space') {
        console.log("hello jeff");
        dock.intakeCharacter(' ');
    } else if (e.key !== 'Enter') {
        dock.intakeCharacter(e.key);
    }
});

document.addEventListener('keydown', (e): void => {
    console.log(e.code, e.key, 'yang');

    switch (e.key) {
        case "Backspace":
            dock.deleteCharacter();
            return;
        case "ArrowRight":
            dock.goRight();
            return;
        case "ArrowLeft":
            dock.goLeft();
            return;
    }

});

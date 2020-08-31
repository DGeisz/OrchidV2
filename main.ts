import { app, BrowserWindow } from 'electron';

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    console.log(__dirname);
    win.loadFile([__dirname, '/src/Skeleton/index.html'].join('')).catch(e => console.log("Error: ", e));
}

app.whenReady().then(createWindow);
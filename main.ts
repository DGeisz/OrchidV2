import { app, BrowserWindow } from 'electron';

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    console.log(__dirname)
    win.loadFile([__dirname, '/index.html'].join(''));
}

app.whenReady().then(createWindow);
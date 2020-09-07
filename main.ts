import { app, BrowserWindow, ipcMain } from 'electron';

require('electron-reload')(__dirname);

async function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    console.log(__dirname);
    try {
        await win.loadFile([__dirname, '/src/Skeleton/index.html'].join(''));
    } catch (e) {
        console.log("Error:", e);
    }
}

ipcMain.on('render-complete', (event => {
    console.log("Got render!");
    event.reply('init');
}));

app.whenReady().then(createWindow);
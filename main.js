const { app, BrowserWindow } = require('electron');

const createWindow = () => {

    const win = new BrowserWindow({

        width: 1000,
        height: 700,
        mionWidth: 800,
        minHeight: 600,
        backgroundColor: '#f4f4f4',
    });

    win.loadFile('index.html');
 };

 app.whenReady().then(() => {
    createWindow();
})
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const api = require('./src/js/api.js');
const {ipcMain} = require('electron');
const timeTrial = require('./src/js/trialer');

let win;

function createWindow(){
    win = new BrowserWindow({width: 800, height: 700});

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
    }));

    win.webContents.openDevTools();

	api.getMyTrials(function(trials){
		console.log(trials);
	});

    win.on('closed', () => {
        win = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if(win === null){
        createWindow()
    }
});


ipcMain.on('saveandrun', function(e, obj){
	console.log(obj);
});

ipcMain.on('start', function(e, obj){
	timeTrial.init(obj.code_1, obj.code_2);
});

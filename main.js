const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

//////////////////////////
// Function definitions.
/////////////////////////

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // If you want you can open the chrome inspection window as well.
    //mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

function onDataRecieved(data) {
    // The data is in JSON format.
}


///////////////////
// App lifecycle.
//////////////////

app.on('ready', createWindow);


app.on('window-all-closed', function() {
    // This is necessary for OS X
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
    createWindow();
    }
});




////////////////////////////////////////////////////////////////
// Application specific initialization code should be put here.
//////////////////////////////////////////////////////////////

// Require all of the necessary modules.
var ipc = require("electron").ipcMain;
var mindWave = require("node-thinkgear-sockets");

var client = mindWave.createClient({
    enableRawOutput: true
});

client.on("data", onDataRecieved);
client.connect();

ipc.on("upload-data", function() {
   console.log("For the real deal this is where data would be uploaded to the server."); 
});


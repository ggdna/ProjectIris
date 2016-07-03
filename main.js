const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
// The connection state.
var connected = false;

var collectData = false;

var ipc = require("electron").ipcMain;

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
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

function onDataRecieved(data) {
    // The data is in JSON format.
    
    var prevConnected = connected;
    console.log(prevConnected);
    connected = data.poorSignalLevel != -1;
    console.log(connected);
    if (!connected) {
        // Try connecting again.
        client.connect();
    }
    
    if (prevConnected !== connected) {
        // The connection state has changed send an event to the renderer.
        console.log("Firing");
        ipc.send("connection_state_changed", connected);
    }
    
    if (connected && collectData) {
        // Send the data to the SQL database.
        console.log("Logging data...");
    }
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
var mindWave = require("node-thinkgear-sockets");

var client = mindWave.createClient({
    enableRawOutput: true
});

client.on("data", onDataRecieved);
client.connect();

ipc.on("upload-data", function() {
    console.log("For the real deal this is where data would be uploaded to the server."); 
});

ipc.on("nav-from-start", function() {
    mainWindow.loadURL(`file://${__dirname}/demographics.html`)
});

ipc.on("nav-from-demographics", function() {
    mainWindow.loadURL(`file://${__dirname}/image_stimulate.html`);
});

ipc.on("set-collect-data", function (shouldCollect) {
    collectData = shouldCollect;
});

ipc.on("nav-from-image-simulate", function () {
    mainWindow.loadURL(`file://${__dirname}/finished.html`);
});

ipc.on("nav-from-finished", function () {
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
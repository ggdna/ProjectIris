// RENDER FOR INDEX.HTML

var ipc = require("electron").ipcRenderer;

var connectedDiv = $("#connectedDiv");
var disconnectedDiv = $("#disconnectedDiv");

$(".submit-btn").click(function () {
    ipc.send("upload-data");
});


//////////////////////////
// All Methods.
////////////////////
function onConnectionStateChanged(connectionState) {
    // Update the DOM.
    if (connectionState) {
        connectedDiv.show();
        disconnectedDiv.show();
    }
    else {
        connectedDiv.hide();
        disconnectedDiv.show();
    }
}




//////////////////////////////
// Add all event listener's
////////////////////////////

ipc.on("connection_state_changed", onConnectionStateChanged);



//////////////////////////
// Initialization code.
onConnectionStateChanged(false);



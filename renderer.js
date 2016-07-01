// This is on the renderer thread.

var ipc = require("electron").ipcRenderer;

var submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function () {
    ipc.send("upload-data");
});
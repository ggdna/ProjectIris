
var ipc = require("electron").ipcRenderer;

var msgs = ["top-left", "top-right", "bottom-left", "bottom-right"];
var currentIndex = 0;

function resizeElements() {
    var windowHeight = $(window).height() - 80;
    var windowWidth = $(window).width();
    $(".conta").height(windowHeight);
    $(".sub-row").height(windowHeight / 2);
    $(".test-image").width(windowHeight / 2);
    $(".test-image").height(windowHeight / 2);
}

function onTimeElapsed() {
    // Stop getting the data from the MindWave.
    ipc.send("set-collect-data", false);
    
    if (currentIndex >= msgs.length) {
        // The user has gone through all of the tests.
        
    }
    
    changeToStandbyUI();
}

function startTimer() {
    $("#timer").timer("remove");
    $("#timer").timer({
        seconds: 3,
        callback: onTimeElapsed,
        format: "%m:%s"
    });
    
    // Start getting the data from the MindWave.
    ipc.send("set-collect-data", true);
}

function changeToStandbyUI() {
    // Hide the images.
    $(".standby-ui").show();
    $(".test-ui").hide();
    $(".conta").hide();
}

function changeToTestUI() {
    $(".standby-ui").hide();
    $(".test-ui").show();
    $(".conta").show();
}

$(window).load(function () {
    resizeElements();
    
    changeToStandbyUI();
    $("#startBtn").click(function () {
        // Start the timer.
        startTimer();
        
        // Display the help message.
        $("#instructionText").text("Look at the " + msgs[currentIndex++] + " image");
        
        // Change to the test UI.
        changeToTestUI();
    });
});

$(window).on("resize", function () {
    resizeElements(); 
});
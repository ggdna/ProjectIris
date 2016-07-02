// RENDER FOR DEMOGRAPHICS.HTML

var ipc = require("electron").ipcRenderer;

$("#mainForm").submit(function (event) {
    event.preventDefault();
    
    console.log("Here the data would be submitted to the server.");
    
    var ageInput = $("#ageInput").val();
    var genderInput = $("#genderInput").val();
    var heightInput = $("#heightInput").val();
    var weightInput = $("#weightInput").val();
    var ethnicityInput = $("#ethnicityInput").val();
    var diseaseInput = $("#diseaseInput").val();
    var timeOfDiseaseInput = $("#timeOfDiseaseInput").val();
    var typeOfDrugsInput = $("#typeOfDrugsInput").val();
    
    console.log(ageInput);
    console.log(genderInput);
    console.log(heightInput);
    console.log(weightInput);
    console.log(ethnicityInput);
    console.log(diseaseInput);
    console.log(timeOfDiseaseInput);
    console.log(typeOfDrugsInput);
    
    ipc.send("nav-from-demographics");
});
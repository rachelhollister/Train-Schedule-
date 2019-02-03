// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMBbxkEAjn2Cn5jP0RElTNbFkjGZdgFaY",
    authDomain: "train-choo-choo-bb873.firebaseapp.com",
    databaseURL: "https://train-choo-choo-bb873.firebaseio.com",
    projectId: "train-choo-choo-bb873",
    storageBucket: "",
    messagingSenderId: "858311550286"
  };
  firebase.initializeApp(config);

 //reference firebase database 
var trainData = firebase.database();

//make it so I can send data to firebase with jQuery

$("#addTrainBtn").on("click",function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

trainData.ref().push(newTrain);

alert("Train Added!");

$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");
console.log(firstTrain);
return false;
    
})

// console.log ("Hello");
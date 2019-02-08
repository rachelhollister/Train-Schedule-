// Initialize Firebase
var config = {
    apiKey: "AIzaSyDwzKZ46D3ulYk7tQgWLInNTFiR_zlAi10",
    authDomain: "click-button-769dc.firebaseapp.com",
    databaseURL: "https://click-button-769dc.firebaseio.com",
    projectId: "click-button-769dc",
    storageBucket: "click-button-769dc.appspot.com",
    messagingSenderId: "806612021026"
  };
  firebase.initializeApp(config);

 //reference firebase database 
var trainData = firebase.database();

//sending data to firebase with $()
//moment. turn first train input to a units variable - will convert to one line
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

//collect data from firebase

trainData.ref().on("child_added",function(snapshot){
var name = snapshot.val().name;
var destination = snapshot.val().destination;
var frequency = snapshot.val().frequency;
var firstTrain = snapshot.val().firstTrain;

// calculate when the next train will be and how many minutes until arrival
var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
var minutes = frequency - remainder;
var arrival = moment().add(minutes,"m").format("hh:mm A");

console.log(remainder);
console.log(minutes);
console.log(arrival);

// append a new row for each new piece of data, and then new data for each col
$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

})


// console.log ("Hello");

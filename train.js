// variable to store firebase data
var database = firebase.database();

// search button click function
$("#userInput").on("click", function (event) {

    // prevents duplications
    event.preventDefault();

    // variables to store user inputs
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#start-input").val().trim(), "HH:mm").format("hh:mm");
    var frequency = $("frequency").val().trim();

    // checks variables for proper functionality
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // object for holding train search data
    var nextTrain = {
        name: trainName,
        dest: destination,
        first: firstTrain,
        freq: frequency
    };
    
    // check for functional object
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);

    // push to firebase
    database.ref().push(nextTrain);

    // empties input boxes for next search
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");


});
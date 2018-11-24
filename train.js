  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0sGsAQVKcUZ25thqtih7GdrXrx23hpQI",
    authDomain: "train-shedule-53468.firebaseapp.com",
    databaseURL: "https://train-shedule-53468.firebaseio.com",
    projectId: "train-shedule-53468",
    storageBucket: "https://train-shedule-53468.appspot.com",
    messagingSenderId: "388400015836"
  };

  firebase.initializeApp(config);

// variable to store firebase data
var database = firebase.database();

// search button click function
$("#userInput").on("click", function (event) {

    // prevents duplications
    event.preventDefault();

    // variables to store user inputs
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").format("hh:mm");
    var frequency = $("#frequency").val().trim();

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
    console.log(nextTrain.name);
    console.log(nextTrain.dest);
    console.log(nextTrain.first);
    console.log(nextTrain.freq);

    // push to firebase
    database.ref().push(nextTrain);

    // empties input boxes for next search
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");


});

database.ref().on("child_added", function (childSnapshot) {

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().dest;
        var firstTrain = childSnapshot.val().first;
        var frequency = childSnapshot.val().freq;

        // Convert First Time to Past Date
        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

        // Calculate Difference Between Current Time and First Train Converted
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

        // Time Remaining
        var timeRemaining = diffTime % frequency;

        // Minutes Until Next Train
        var minutesAway = frequency - timeRemaining;

        // Time of Next Arrival
        var nextArrival = moment().add(minutesAway, "minutes");

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(moment(nextArrival).format("hh:mm A")),
            $("<td>").text(minutesAway),
        );

        // Append the new row to the table
        $(".table > tbody").append(newRow);

});

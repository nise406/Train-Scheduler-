  var config = {
    apiKey: "AIzaSyAXhiaWTghZTKOs7XPbLDNbZhuRVmpfL98",
    authDomain: "train-scheduler-2376d.firebaseapp.com",
    databaseURL: "https://train-scheduler-2376d.firebaseio.com",
    projectId: "train-scheduler-2376d",
    storageBucket: "train-scheduler-2376d.appspot.com",
    messagingSenderId: "562771607887"
  };
  firebase.initializeApp(config);
//firebase
  var database = firebase.database();
  $("#addTrainBtn").on("click", function(){
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
      var frequency = $("#frequencyInput").val().trim();

      var newTrain ={
          name: trainName,
          place: destination,
          ftrain: firstTrain,
          freq: frequency,
      }

      database.ref().push(newTrain);
      console.log(newTrain.name);

      $("#trainNameInput").val(" ");
      $("#destinationInput").val(" ");
      $("#timeInput").val(" ");
      $("#frequencyInput").val(" ");

      return false;
  });

  database.ref().on("child_added", function(childSnapshot){
      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().place;
      var firstTrain = childSnapshot.val().ftrain;
      var frequency = childSnapshot.val().freq;

      //ftrain pushed back 

      var firstTimeConverted = moment(firstTrain, "HH:mm");
      console.log(firstTimeConverted);

      var currentTime = moment().format("HH:mm");
      console.log(currentTime);

      var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
      console.log(firstTrain);
      console.log("Difference in Time: " + timeDiff);

      var timeRemainder = timeDiff % frequency;
      console.log(timeRemainder);

      var minToTrain = frequency - timeRemainder; 
      var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
      $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td> "+ frequency + "</td><td>" + timeRemainder +"</td></tr>");

  })
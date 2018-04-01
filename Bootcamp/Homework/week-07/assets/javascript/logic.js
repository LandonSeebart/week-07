

$(document).ready(() => {
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyCHUCFw2XbNUu9dSHCXbm3UXWI8k-vI200',
    authDomain: 'trains-on-time.firebaseapp.com',
    databaseURL: 'https://trains-on-time.firebaseio.com',
    projectId: 'trains-on-time',
    storageBucket: '',
    messagingSenderId: '278644635731',
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  $('#add-train-btn').on('click', (event) => {
    event.preventDefault();

    // Get all the user inputs and put them in variables so we can push the to a database
    const trainName = $('#train-name-input').val().trim();
    const trainDestination = $('#destination-input').val().trim();
    const trainStart = moment($('#start-input').val().trim(), 'DD/MM/YY').format('X');
    const trainFrequency = $('#frequency-input').val().trim();

    // Make and object for each new train
    const newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFrequency,
    };

      // Push each new train to the database
    database.ref().push(newTrain);
  });

  database.ref().on('child_added', (childSnapshot, prevChildKey) => {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    const trainName = childSnapshot.val().name;
    const trainDestination = childSnapshot.val().destination;
    const trainStart = childSnapshot.val().start;
    const trainFrequency = childSnapshot.val().frequency;

    // Show me all the train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);

    $('#train-table > tbody').append(`<tr><td>${trainName}</td><td>${trainDestination}</td><td>${
      trainStart}</td><td>${trainFrequency}</td></tr>`);
  });
}); // Document ready

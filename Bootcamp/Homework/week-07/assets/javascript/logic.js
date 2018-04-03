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

  // Add listener to add train button and push everything to firebase on click
  $('#add-train-btn').on('click', (event) => {
    event.preventDefault();

    // Get all the user inputs and put them in variables so we can push the to a database
    const trainName = $('#train-name-input').val().trim();
    const trainDestination = $('#destination-input').val().trim();
    const trainStart = $('#start-input').val().trim();
    const trainFrequency = $('#frequency-input').val().trim();

    console.log(trainStart);

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

  // Update the table when a record is added to or updated within the database
  database.ref().on('child_added', (childSnapshot, prevChildKey) => {
    // Store everything into a variable.
    const trainName = childSnapshot.val().name;
    const trainDestination = childSnapshot.val().destination;
    const trainStart = childSnapshot.val().start;
    const trainFrequency = childSnapshot.val().frequency;

    // moment.js calculations
    const trainStartConverted = moment(trainStart, 'HH:mm').subtract(1, 'years');
    console.log(trainStartConverted);

    const diffTime = moment().diff(trainStartConverted, 'minutes');
    console.log(`DIFFERENCE IN TIME: ${diffTime}`);

    const trainRemainder = diffTime % trainFrequency;
    console.log(trainRemainder);

    const minutesTillTrain = trainFrequency - trainRemainder;
    console.log(`MINUTES TILL TRAIN: ${minutesTillTrain}`);

    const nextTrain = moment().add(minutesTillTrain, 'minutes').format('HH:mm');
    console.log(`ARRIVAL TIME: ${moment(nextTrain).format('hh:mm')}`);

    $('#train-table > tbody').append(`<tr><td>${trainName}</td><td>${trainDestination}</td><td>${trainFrequency}</td>
    <td>${nextTrain}</td><td>${minutesTillTrain}</td></tr>`);
  });
}); // Document ready

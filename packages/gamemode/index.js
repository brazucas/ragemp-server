var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyCPX0pGdwd-DdpVbZkK6K3VZpVaz6keU9s",
  authDomain: "brazucas-ragemp.firebaseapp.com",
  databaseURL: "https://brazucas-ragemp.firebaseio.com",
  projectId: "brazucas-ragemp",
  storageBucket: "brazucas-ragemp.appspot.com",
  messagingSenderId: "695744593160"
};


firebase.initializeApp(config);

var users = firebase.database().ref('users');

console.log(users);
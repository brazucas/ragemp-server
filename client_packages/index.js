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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('usuário autenticado.');
  } else {
    console.log('usuário NÃO autenticado.');
  }
});

firebase.auth().signInWithEmailAndPassword('pplp93@gmail.com', 'abcd1234').catch(function(error) {
  console.log(error);
});
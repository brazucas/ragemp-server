var firebase = require('firebase');

var handlers = {
  chat: require('./handler/playerChat'),
  death: require('./handler/playerDeath'),
  join: require('./handler/playerJoin'),
  quit: require('./handler/playerQuit')
}

var firebaseConfig = {
  apiKey: "AIzaSyCPX0pGdwd-DdpVbZkK6K3VZpVaz6keU9s",
  authDomain: "brazucas-ragemp.firebaseapp.com",
  databaseURL: "https://brazucas-ragemp.firebaseio.com",
  projectId: "brazucas-ragemp",
  storageBucket: "brazucas-ragemp.appspot.com",
  messagingSenderId: "695744593160"
};


var app = firebase.initializeApp(firebaseConfig);

mp.events.add("playerJoin", handlers.join);
mp.events.add("playerQuit", handlers.quit);
mp.events.add("playerChat", handlers.chat);
mp.events.add("playerDeath", handlers.death);

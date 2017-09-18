var firebase = require('firebase-admin');
var minigames = require('./minigames');

var handlers = {
  chat: require('./handler/playerChat'),
  death: require('./handler/playerDeath'),
  join: require('./handler/playerJoin'),
  quit: require('./handler/playerQuit')
}

var serviceAccount = require("./vendor/firebase/serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://brazucas-ragemp.firebaseio.com"
});

mp.events.add("playerJoin", handlers.join);
mp.events.add("playerQuit", handlers.quit);
mp.events.add("playerChat", handlers.chat);
mp.events.add("playerDeath", handlers.death);

minigames.init();
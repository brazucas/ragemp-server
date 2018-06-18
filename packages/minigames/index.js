var minigames = require('./minigames');
var commands = require('./lib/commands');

var handlers = {
  chat: require('./handler/playerChat'),
  death: require('./handler/playerDeath'),
  join: require('./handler/playerJoin'),
  quit: require('./handler/playerQuit')
}

mp.events.add("playerJoin", handlers.join);
mp.events.add("playerQuit", handlers.quit);
mp.events.add("playerChat", handlers.chat);
mp.events.add("playerDeath", handlers.death);

minigames.init();
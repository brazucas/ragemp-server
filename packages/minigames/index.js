'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var minigames_1 = require("./minigames");
var playerJoin_1 = require("./handler/playerJoin");
var playerQuit_1 = require("./handler/playerQuit");
var playerDeath_1 = require("./handler/playerDeath");
var playerChat_1 = require("./handler/playerChat");
mp.events.add("playerJoin", playerJoin_1.PlayerJoinHandler);
mp.events.add("playerQuit", playerQuit_1.PlayerQuitHandler);
mp.events.add("playerChat", playerDeath_1.PlayerChatHandler);
mp.events.add("playerDeath", playerChat_1.PlayerDeathHandler);
var minigames = new minigames_1.Minigames();
//# sourceMappingURL=index.js.map
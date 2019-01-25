'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var rpg_1 = require("./rpg");
var playerJoin_1 = require("./handler/playerJoin");
var playerQuit_1 = require("./handler/playerQuit");
var playerDeath_1 = require("./handler/playerDeath");
var playerChat_1 = require("./handler/playerChat");
var brazucas_server_1 = require("../../common/brazucas-server");
mp.events.add("playerJoin" /* PLAYER_JOIN */, playerJoin_1.PlayerJoinHandler);
mp.events.add("playerQuit" /* PLAYER_QUIT */, playerQuit_1.PlayerQuitHandler);
mp.events.add("playerChat" /* PLAYER_CHAT */, playerDeath_1.PlayerChatHandler);
mp.events.add("playerDeath" /* PLAYER_DEATH */, playerChat_1.PlayerDeathHandler);
var brazucasServer = new brazucas_server_1.BrazucasServer();
brazucasServer.onload()
    .subscribe(function () { new rpg_1.Rpg(brazucasServer); }, console.error);
//# sourceMappingURL=index.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const brazucas_server_1 = require("../../common/brazucas-server");
const playerChat_1 = require("./handler/playerChat");
const playerDeath_1 = require("./handler/playerDeath");
const playerJoin_1 = require("./handler/playerJoin");
const playerQuit_1 = require("./handler/playerQuit");
const rpg_1 = require("./rpg");
mp.events.add("playerJoin" /* PLAYER_JOIN */, playerJoin_1.PlayerJoinHandler);
mp.events.add("playerQuit" /* PLAYER_QUIT */, playerQuit_1.PlayerQuitHandler);
mp.events.add("playerChat" /* PLAYER_CHAT */, playerDeath_1.PlayerChatHandler);
mp.events.add("playerDeath" /* PLAYER_DEATH */, playerChat_1.PlayerDeathHandler);
mp.events.add("playerChat" /* PLAYER_CHAT */, (player, text) => {
    console.log('>>>> jogador escreveu!');
});
let brazucasServer = new brazucas_server_1.BrazucasServer();
brazucasServer.onload()
    .subscribe(() => new rpg_1.Rpg(brazucasServer), console.error);
//# sourceMappingURL=index.js.map
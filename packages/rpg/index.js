'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const brazucas_server_1 = require("../../common/brazucas-server");
const playerJoin_1 = require("./handler/playerJoin");
const playerQuit_1 = require("./handler/playerQuit");
const rpg_1 = require("./rpg");
const playerChat_1 = require("./handler/playerChat");
const playerDeath_1 = require("./handler/playerDeath");
const commands_1 = require("./lib/commands/commands");
mp.events.add("playerJoin" /* PLAYER_JOIN */, playerJoin_1.PlayerJoinHandler);
mp.events.add("playerQuit" /* PLAYER_QUIT */, playerQuit_1.PlayerQuitHandler);
mp.events.add("playerChat" /* PLAYER_CHAT */, playerChat_1.PlayerChatHandler);
mp.events.add("playerDeath" /* PLAYER_DEATH */, playerDeath_1.PlayerDeathHandler);
mp.events.add('playerCommand', (player, command) => {
    console.debug(`[COMANDO] ${player.name} enviou o comando ${command}`);
    const arr = command.split(' ');
    if (commands_1.Comandos[arr[0]]) {
        commands_1.Comandos[arr[0]](player, ...arr);
    }
    else {
        player.outputChatBox('!{#FF0000}Comando desconhecido');
    }
});
let brazucasServer = new brazucas_server_1.BrazucasServer();
brazucasServer.onload()
    .subscribe(() => new rpg_1.Rpg(brazucasServer), console.error);
//# sourceMappingURL=index.js.map
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const brazucas_server_1 = require("../../common/brazucas-server");
const playerChat_1 = require("./handler/playerChat");
const playerDeath_1 = require("./handler/playerDeath");
const playerJoin_1 = require("./handler/playerJoin");
const playerQuit_1 = require("./handler/playerQuit");
const brazucas_eventos_1 = require("./interfaces/brazucas-eventos");
const commands_1 = require("./lib/commands/commands");
const events_1 = require("./lib/events/events");
const player_1 = require("./lib/functions/player");
const rpg_1 = require("./rpg");
mp.events.add("playerCommand" /* PLAYER_COMMAND */, (player, command) => {
    console.debug(`[COMANDO] ${player.name} enviou o comando ${command}`);
    const comandos = new commands_1.Commands(brazucasServer);
    const arr = command.split(' ');
    if (comandos[arr[0]]) {
        const comando = arr[0];
        arr.shift();
        comandos[comando](player, ...arr);
    }
    else {
        player.outputChatBox('!{#FF0000}Comando desconhecido');
    }
});
let brazucasServer = new brazucas_server_1.BrazucasServer();
mp.events.add("playerJoin" /* PLAYER_JOIN */, playerJoin_1.PlayerJoinHandler.bind(playerJoin_1.PlayerJoinHandler, brazucasServer));
mp.events.add("playerQuit" /* PLAYER_QUIT */, playerQuit_1.PlayerQuitHandler.bind(playerQuit_1.PlayerQuitHandler, brazucasServer));
mp.events.add("playerChat" /* PLAYER_CHAT */, playerChat_1.PlayerChatHandler.bind(playerChat_1.PlayerChatHandler, brazucasServer));
mp.events.add("playerDeath" /* PLAYER_DEATH */, playerDeath_1.PlayerDeathHandler.bind(playerDeath_1.PlayerDeathHandler, brazucasServer));
mp.events.add(brazucas_eventos_1.BrazucasEventos.BROWSER, (player, serverEventStr) => __awaiter(this, void 0, void 0, function* () {
    const serverEvent = JSON.parse(serverEventStr);
    console.debug('>>>> ', serverEventStr, serverEvent);
    console.debug(`[EVENTOS] Jogador ${player.name} ativou o evento ${serverEvent.event} (ID ${serverEvent.eventId}) 
  com os seguintes parâmetros: ${serverEvent.data}`);
    const data = JSON.parse(serverEvent.data);
    const events = new events_1.Events(brazucasServer);
    if (events[serverEvent.event]) {
        const resposta = yield events[serverEvent.event](player, data);
        player_1.playerEvent(player, brazucas_eventos_1.BrazucasEventos.SERVER, resposta, serverEvent.eventId);
    }
    else {
        console.error(`[ERROR] O evento ${event} é inexistente`);
    }
}));
brazucasServer.onload()
    .subscribe(() => new rpg_1.Rpg(brazucasServer), console.error);
//# sourceMappingURL=index.js.map
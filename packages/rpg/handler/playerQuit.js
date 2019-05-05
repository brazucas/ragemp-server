"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("../lib/functions/player");
function PlayerQuitHandler(brazucasServer, player, exitType, reason) {
    console.debug(`[SAÍDA] ${player.name} saiu do servidor (IP: ${player.ip}, Tipo: ${exitType}, Razão: ${reason})`);
    player_1.notificarTodos(`~r~${player.name} ~w~saiu do servidor`);
}
exports.PlayerQuitHandler = PlayerQuitHandler;
//# sourceMappingURL=playerQuit.js.map
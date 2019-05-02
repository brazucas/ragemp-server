"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("../lib/functions/player");
function PlayerJoinHandler(player) {
    console.debug(`[ENTRADA] ${player.name} entrou no servidor (${player.ip})`);
    player_1.notificarTodos(`~y~${player.name} ~w~entrou no servidor`);
}
exports.PlayerJoinHandler = PlayerJoinHandler;
//# sourceMappingURL=playerJoin.js.map
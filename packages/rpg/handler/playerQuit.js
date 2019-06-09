"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const player_1 = require("../lib/functions/player");
const rpg_1 = require("../rpg");
function PlayerQuitHandler(brazucasServer, player, exitType, reason) {
    console.debug(`[SAÍDA] ${player.name} saiu do servidor (IP: ${player.ip}, Tipo: ${exitType}, Razão: ${reason})`);
    const playerToRemove = rpg_1.Rpg.playerProvider.players$.value.find(BRZPlayer => BRZPlayer.storage.nome === player.name);
    rpg_1.Rpg.playerProvider.players$.next(_.without(rpg_1.Rpg.playerProvider.players$.value, playerToRemove));
    player_1.notificarTodos(`~r~${player.name} ~w~saiu do servidor`);
}
exports.PlayerQuitHandler = PlayerQuitHandler;
//# sourceMappingURL=playerQuit.js.map
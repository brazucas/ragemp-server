"use strict";
///<reference path="../../../../node_modules/@types/ragemp-s/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
const brazucas_eventos_1 = require("../../interfaces/brazucas-eventos");
const player_1 = require("../functions/player");
const comandos_admin_1 = require("./comandos-admin");
class Commands extends comandos_admin_1.ComandosAdmin {
    constructor(brazucasServer) {
        super(brazucasServer);
    }
    dararma(player, weaponHash) {
        console.debug(`[COMANDOS - dararma] Dando arma ${weaponHash} para o jogador ${player.name}`);
        const asset = mp.joaat(weaponHash);
        player.giveWeapon(asset, 1000);
        player.notify(`Arma ${weaponHash} recebida!`);
    }
    posicaoatual(player) {
        console.debug(`[COMANDOS - posicaoatual] Posição atual de ${player.name}: ${player.position.toString()}`);
        player.outputChatBox(`Posição atual: ${player.position.toString()}`);
    }
    browser(player) {
        player_1.playerEvent(player, brazucas_eventos_1.BrazucasEventos.INICIAR_NAVEGADOR);
    }
    cursor(player) {
        player_1.playerEvent(player, brazucas_eventos_1.BrazucasEventos.CURSOR);
    }
}
exports.Commands = Commands;
//# sourceMappingURL=commands.js.map
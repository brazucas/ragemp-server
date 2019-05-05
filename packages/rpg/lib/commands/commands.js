"use strict";
///<reference path="../../../../node_modules/@types/ragemp-s/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const comandos_admin_1 = require("./comandos-admin");
class Comandos extends comandos_admin_1.ComandosAdmin {
    static dararma(player, weaponHash) {
        console.debug(`[COMANDOS - dararma] Dando arma ${weaponHash} para o jogador ${player.name}`);
        const asset = mp.joaat(weaponHash);
        player.giveWeapon(asset, 1000);
        player.notify(`Arma ${weaponHash} recebida!`);
    }
    static posicaoatual(player) {
        console.debug(`[COMANDOS - posicaoatual] Posição atual de ${player.name}: ${player.position.toString()}`);
        player.outputChatBox(`Posição atual: ${player.position.toString()}`);
    }
    static browser(player) {
        player.call('IniciarNavegador', []);
    }
    static cursor(player) {
        player.call('cursor', []);
    }
}
exports.Comandos = Comandos;
//# sourceMappingURL=commands.js.map
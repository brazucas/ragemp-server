"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comandos {
    static darArma(player, weaponHash) {
        console.debug(`[COMANDOS - darArma] Dando arma ${weaponHash} para o jogador ${player.name}`);
        player.giveWeapon(weaponHash, 1000);
    }
}
exports.Comandos = Comandos;
//# sourceMappingURL=commands.js.map
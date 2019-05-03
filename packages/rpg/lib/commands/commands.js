"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comandos {
    static darArma(player, weaponHash) {
        console.debug(`[COMANDOS - darArma] Dando arma ${weaponHash} para o jogador ${player.name}`);
        const asset = mp.joaat(weaponHash);
        console.log('>>>> asset ', asset);
        player.giveWeapon(asset, 1000);
        player.notify(`Arma ${weaponHash} recebida!`);
    }
}
exports.Comandos = Comandos;
//# sourceMappingURL=commands.js.map
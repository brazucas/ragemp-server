"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comandos {
    static dararma(player, weaponHash) {
        console.debug(`[COMANDOS - dararma] Dando arma ${weaponHash} para o jogador ${player.name}`);
        const asset = mp.joaat(weaponHash);
        console.log('>>>> asset ', asset);
        player.giveWeapon(asset, 1000);
        player.notify(`Arma ${weaponHash} recebida!`);
    }
    static posicaoatual(player) {
        console.debug(`[COMANDOS - posicaoatual] Posição atual de ${player.name}: ${player.position.toString()}`);
        player.outputChatBox(`Posição atual: ${player.position.toString()}`);
    }
}
exports.Comandos = Comandos;
//# sourceMappingURL=commands.js.map
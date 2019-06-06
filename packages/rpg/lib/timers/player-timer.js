"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rpg_1 = require("../../rpg");
const FOME_DEFAULT_DECREASE = 1;
const SEDE_DEFAULT_DECREASE = 1;
const SONO_DEFAULT_DECREASE = 1;
const FORCA_FISICA_DEFAULT_DECREASE = 1;
class PlayerTimer {
    constructor(brazucasServer) {
        this.brazucasServer = brazucasServer;
        setInterval(() => this.atualizarFome(), 60000);
        setInterval(() => this.atualizarSede(), 45000);
        setInterval(() => this.atualizarSono(), 180000);
        setInterval(() => this.atualizarForcaFisica(), 200000);
    }
    atualizarFome() {
        mp.players.forEach(playerMp => {
            const brzPlayer = rpg_1.Rpg.playerProvider.findFromMp(playerMp);
            const updatedValue = Math.max(brzPlayer.storage.fome - FOME_DEFAULT_DECREASE, 0);
            if (updatedValue === 0) {
                playerMp.health -= 1;
            }
            rpg_1.Rpg.playerProvider.update(playerMp, {
                fome: updatedValue,
            });
        });
    }
    atualizarSede() {
        mp.players.forEach(playerMp => {
            const brzPlayer = rpg_1.Rpg.playerProvider.findFromMp(playerMp);
            const updatedValue = Math.max(brzPlayer.storage.sede - SEDE_DEFAULT_DECREASE, 0);
            if (updatedValue === 0) {
                brzPlayer.storage.fome -= 1;
            }
            rpg_1.Rpg.playerProvider.update(playerMp, {
                sede: updatedValue,
            });
        });
    }
    atualizarSono() {
        mp.players.forEach(playerMp => {
            const brzPlayer = rpg_1.Rpg.playerProvider.findFromMp(playerMp);
            const updatedValue = Math.max(brzPlayer.storage.sono - SONO_DEFAULT_DECREASE, 0);
            if (updatedValue === 0) {
                // @TODO fazer o jogador dormir
            }
            rpg_1.Rpg.playerProvider.update(playerMp, {
                sono: updatedValue,
            });
        });
    }
    atualizarForcaFisica() {
        mp.players.forEach(playerMp => {
            const brzPlayer = rpg_1.Rpg.playerProvider.findFromMp(playerMp);
            const updatedValue = Math.max(brzPlayer.storage.forcaFisica - FORCA_FISICA_DEFAULT_DECREASE, 0);
            if (updatedValue === 0) {
                // @TODO O que fazer quando chegar a zero?
            }
            rpg_1.Rpg.playerProvider.update(playerMp, {
                forcaFisica: updatedValue,
            });
        });
    }
}
exports.PlayerTimer = PlayerTimer;
//# sourceMappingURL=player-timer.js.map
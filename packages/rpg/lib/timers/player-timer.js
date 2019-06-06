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
            rpg_1.Rpg.playerProvider.update(playerMp, {
                fome: brzPlayer.storage.fome - FOME_DEFAULT_DECREASE,
            });
        });
    }
    atualizarSede() {
        mp.players.forEach(playerMp => {
            const brzPlayer = rpg_1.Rpg.playerProvider.findFromMp(playerMp);
            rpg_1.Rpg.playerProvider.update(playerMp, {
                sede: brzPlayer.storage.sede - SEDE_DEFAULT_DECREASE,
            });
        });
    }
    atualizarSono() {
        mp.players.forEach(playerMp => {
            const brzPlayer = rpg_1.Rpg.playerProvider.findFromMp(playerMp);
            rpg_1.Rpg.playerProvider.update(playerMp, {
                sono: brzPlayer.storage.sono - SONO_DEFAULT_DECREASE,
            });
        });
    }
    atualizarForcaFisica() {
        mp.players.forEach(playerMp => {
            const brzPlayer = rpg_1.Rpg.playerProvider.findFromMp(playerMp);
            rpg_1.Rpg.playerProvider.update(playerMp, {
                forcaFisica: brzPlayer.storage.forcaFisica - FORCA_FISICA_DEFAULT_DECREASE,
            });
        });
    }
}
exports.PlayerTimer = PlayerTimer;
//# sourceMappingURL=player-timer.js.map
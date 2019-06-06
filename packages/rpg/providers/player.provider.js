"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const brazucas_eventos_1 = require("../interfaces/brazucas-eventos");
const player_1 = require("../lib/functions/player");
class PlayerProvider {
    constructor(brazucasServer) {
        this.players$ = new BehaviorSubject_1.BehaviorSubject([]);
        PlayerProvider.brazucasServer = brazucasServer;
    }
    findFromMp(player) {
        return this.players$.value.find((storedPlayer) => storedPlayer.mp.id === player.id);
    }
    update(player, data, autoSave = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brzPlayer = this.findFromMp(player);
                if (brzPlayer) {
                    Object.keys(data.toJSON()).forEach((key) => brzPlayer.storage[key] = data[key]);
                    if (autoSave) {
                        yield brzPlayer.storage.save();
                    }
                    player_1.playerEvent(player, brazucas_eventos_1.BrazucasEventos.DADOS_JOGADOR, brzPlayer.storage.toJSON());
                }
                else {
                    console.warn('[WARNING] Jogador não encontrado para atualizar');
                }
                return true;
            }
            catch (err) {
                console.error(`[ERROR] Um erro ocorreu ao atualizar o jogador.`);
                console.error(err);
                throw err;
            }
        });
    }
    savePlayer(player) {
        const brzPlayer = this.findFromMp(player);
        if (brzPlayer) {
            return brzPlayer.storage.save();
        }
    }
    addPlayer(brzPlayer) {
        const players = this.players$.value;
        players.push(brzPlayer);
        this.players$.next(players);
    }
}
exports.PlayerProvider = PlayerProvider;
//# sourceMappingURL=player.provider.js.map
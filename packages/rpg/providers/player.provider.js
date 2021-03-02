"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerProvider = void 0;
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const brazucas_eventos_1 = require("../interfaces/brazucas-eventos");
class PlayerProvider {
    constructor(brazucasServer) {
        this.players$ = new BehaviorSubject_1.BehaviorSubject([]);
        PlayerProvider.brazucasServer = brazucasServer;
    }
    findFromMp(player) {
        return this.players$.value.find((storedPlayer) => (storedPlayer.mp && storedPlayer.mp.id === player.id));
    }
    update(player, data, autoSave = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brzPlayer = this.findFromMp(player);
                if (brzPlayer) {
                    Object.keys(data).forEach((key) => brzPlayer.storage[key] = data[key]);
                    if (autoSave) {
                        yield brzPlayer.storage.save();
                    }
                    console.log(`Atualizando jogador ${player.name} ${JSON.stringify(brzPlayer.storage.toJSON())}`);
                    player.call(brazucas_eventos_1.BrazucasEventos.ATUALIZAR_DADOS_JOGADOR, [brzPlayer.storage.toJSON()]);
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
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
const brazucas_eventos_1 = require("../interfaces/brazucas-eventos");
const player_1 = require("../lib/functions/player");
const rpg_1 = require("../rpg");
function PlayerJoinHandler(brazucasServer, player) {
    console.debug(`[ENTRADA] ${player.name} entrou no servidor (${player.ip})`);
    player_1.notificarTodos(`~y~${player.name} ~w~entrou no servidor`);
    const subscribe = brazucasServer.isReady.subscribe(() => __awaiter(this, void 0, void 0, function* () {
        const jogador = yield brazucasServer.loadPlayer(player.name);
        if (jogador) {
            console.debug(`[LOAD PLAYER] Jogador ${jogador.nome} carregado`);
        }
        else {
            console.debug('[LOAD PLAYER] Jogador não encontrado');
        }
        rpg_1.Rpg.playerProvider.addPlayer({
            mp: player,
            storage: jogador,
        });
        player_1.playerEvent(player, brazucas_eventos_1.BrazucasEventos.DADOS_JOGADOR, jogador.toJSON());
        subscribe.unsubscribe();
    }));
}
exports.PlayerJoinHandler = PlayerJoinHandler;
//# sourceMappingURL=playerJoin.js.map
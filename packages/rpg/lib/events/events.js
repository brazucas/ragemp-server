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
const environment_1 = require("../../../../common/environment");
const brazucas_eventos_1 = require("../../interfaces/brazucas-eventos");
const voice_chat_provider_1 = require("../../providers/voice-chat.provider");
const player_1 = require("../functions/player");
class Events {
    constructor(brazucasServer) {
        this.brazucasServer = brazucasServer;
    }
    [brazucas_eventos_1.BrazucasEventos.AUTENTICAR_JOGADOR](player, dados) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jogador = yield this.brazucasServer.autenticarJogador(player.name, dados.senha);
                if (jogador) {
                    player.spawn(environment_1.environment.posicaoLogin);
                    return {
                        eventoResposta: 'AutenticacaoResultado',
                        credenciaisInvalidas: false,
                        autenticado: true,
                    };
                }
                else {
                    return {
                        eventoResposta: 'AutenticacaoResultado',
                        credenciaisInvalidas: true,
                        autenticado: false,
                    };
                }
            }
            catch (err) {
                console.error(err.toString());
                return {
                    eventoResposta: 'AutenticacaoResultado',
                    credenciaisInvalidas: false,
                    autenticado: false,
                };
            }
        });
    }
    [brazucas_eventos_1.BrazucasEventos.REGISTRAR_JOGADOR](player, dados) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jogador = yield this.brazucasServer.registrarJogador(player, dados);
                if (jogador) {
                    player.spawn(environment_1.environment.posicaoLogin);
                    player_1.playerEvent(player, brazucas_eventos_1.BrazucasEventos.REGISTRO_RESULTADO, {
                        erro: false,
                        jogador: jogador,
                        registrado: true,
                    });
                }
                else {
                    player_1.playerEvent(player, brazucas_eventos_1.BrazucasEventos.REGISTRO_RESULTADO, {
                        registrado: false,
                        erro: true,
                    });
                }
            }
            catch (err) {
                console.debug(`[REGISTRO] Um erro ocorreu ao criar o jogador ${player.name}`);
                console.error(err.toString());
                player_1.playerEvent(player, brazucas_eventos_1.BrazucasEventos.REGISTRO_RESULTADO, {
                    registrado: false,
                    erro: true,
                    mensagem: err.toString() || 'Erro interno ao cadastrar',
                });
            }
        });
    }
    [brazucas_eventos_1.BrazucasEventos.CRIAR_VEICULO](player, dados) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.brazucasServer.criarVeiculo(player, dados);
            }
            catch (err) {
                console.debug(`[REGISTRO] Um erro ocorreu ao criar o veículo`);
                console.error(err.toString());
                return false;
            }
        });
    }
    [brazucas_eventos_1.BrazucasEventos.HABILITAR_VOICE_CHAT](player, dados) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = mp.players.at(dados.targetId);
            if (!target) {
                return {
                    erro: true,
                    mensagem: 'Jogador não encontrado',
                };
            }
            voice_chat_provider_1.VoiceChatProvider.habilitar(player, target);
        });
    }
    [brazucas_eventos_1.BrazucasEventos.DESABILITAR_VOICE_CHAT](player, dados) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = mp.players.at(dados.targetId);
            if (!target) {
                return {
                    erro: true,
                    mensagem: 'Jogador não encontrado',
                };
            }
            voice_chat_provider_1.VoiceChatProvider.desabilitar(player, target);
        });
    }
}
exports.Events = Events;
//# sourceMappingURL=events.js.map
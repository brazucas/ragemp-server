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
function eventoLogin(brazucasServer) {
    mp.events.add('AutenticarJogador', (player, dadosStringify) => __awaiter(this, void 0, void 0, function* () {
        const dados = JSON.parse(dadosStringify);
        console.log(`[EVENTO] eventoLogin `, player, dados);
        try {
            const jogador = yield brazucasServer.autenticarJogador(player.name, dados.senha);
            if (jogador) {
                player.spawn(environment_1.environment.posicaoLogin);
                player.call('AutenticacaoResultado', [{
                        credenciaisInvalidas: false,
                        autenticado: true,
                    }]);
            }
            else {
                player.call('AutenticacaoResultado', [{
                        credenciaisInvalidas: true,
                        autenticado: false,
                    }]);
            }
        }
        catch (err) {
            console.error(err.toString());
            player.call('AutenticacaoResultado', [{
                    credenciaisInvalidas: false,
                    autenticado: false,
                }]);
        }
    }));
    mp.events.add('RegistrarJogador', (player, dadosStringify) => __awaiter(this, void 0, void 0, function* () {
        const dados = JSON.parse(dadosStringify);
        console.log('[EVENTO] RegistrarJogador ', player, dados);
        try {
            const jogador = yield brazucasServer.registrarJogador(player, dados);
            if (jogador) {
                player.spawn(environment_1.environment.posicaoLogin);
                player.call('RegistroResultado', [{
                        erro: false,
                        jogador: jogador,
                        registrado: true,
                    }]);
            }
            else {
                player.call('RegistroResultado', [{
                        erro: true,
                    }]);
            }
        }
        catch (err) {
            console.debug(`[REGISTRO] Um erro ocorreu ao criar o jogador ${player.name}`);
            console.error(err.toString());
            player.call('RegistroResultado', [{
                    erro: true,
                    mensagem: err.toString() || 'Erro interno ao cadastrar',
                }]);
        }
    }));
}
exports.eventoLogin = eventoLogin;
//# sourceMappingURL=login.js.map
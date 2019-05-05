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
const rxjs_1 = require("rxjs");
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/of");
const forkJoin_1 = require("rxjs/internal/observable/forkJoin");
const Sequelize = require("sequelize");
const database_1 = require("./database/database");
const Jogador_1 = require("./database/models/Jogador");
const util_1 = require("./util/util");
class BrazucasServer {
    constructor() {
        this.isReady = new rxjs_1.BehaviorSubject(false);
        this.database = new database_1.Database();
    }
    onload() {
        const fork = forkJoin_1.forkJoin(...[
            this.database.sync(),
            this.database.authenticate(),
        ]);
        fork.subscribe(() => this.isReady.next(true));
        return fork;
    }
    loadPlayer(playerName) {
        return Jogador_1.Jogador.findOne({
            ['where']: {
                nome: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nome')), '=', playerName.toLowerCase())
            }
        });
    }
    autenticarJogador(playerName, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const jogador = yield this.loadPlayer(playerName);
            if (!jogador) {
                throw 'Jogador não encontrado';
            }
            const autenticado = yield util_1.bcryptCompare(senha, jogador.senha);
            return autenticado ? jogador : null;
        });
    }
    registrarJogador(player, dados) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug(`[REGISTRO] Novo jogador ${player.name}`);
            if (!dados.senhaConfirma || !dados.senha || !dados.celular || !dados.email ||
                !dados.senhaConfirma.length || !dados.senha.length || !dados.celular.length || !dados.email.length) {
                throw 'Todos os campos devem ser informados';
            }
            if (dados.senha !== dados.senhaConfirma) {
                throw 'As senhas informadas diferem';
            }
            const jogadorExistente = yield this.loadPlayer(player.name);
            if (jogadorExistente) {
                throw 'Já existe um jogador cadastrado com esse nick';
            }
            console.debug(`[REGISTRO] Criando jogador ${player.name}`);
            const senhaHash = yield util_1.bcryptHash(dados.senha);
            let jogador = new Jogador_1.Jogador({
                nome: player.name,
                senha: senhaHash,
                nivel: 1,
                email: dados.email,
                celular: util_1.soNumeros(dados.celular),
            });
            return jogador.save();
        });
    }
}
exports.BrazucasServer = BrazucasServer;
//# sourceMappingURL=brazucas-server.js.map
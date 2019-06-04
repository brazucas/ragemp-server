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
const Veiculo_1 = require("./database/models/Veiculo");
const interfaces_1 = require("./interfaces");
const util_1 = require("./util/util");
const vehicles_1 = require("./util/vehicles");
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
            const playerNameClean = interfaces_1.PLAYER_NAME_REGEXP.exec(player.name);
            if (!playerNameClean ||
                (playerNameClean[1].length !== player.name.length) ||
                player.name.length < interfaces_1.PLAYER_NAME_MINLENGTH ||
                player.name.length > interfaces_1.PLAYER_NAME_MAXLENGTH) {
                throw 'Nick não permitido';
            }
            const jogadorExistente = yield this.loadPlayer(player.name);
            if (jogadorExistente) {
                throw 'Já existe um jogador cadastrado com esse nick';
            }
            console.debug(`[REGISTRO] Criando jogador ${player.name}`);
            const senhaHash = yield util_1.bcryptHash(dados.senha);
            const jogador = new Jogador_1.Jogador({
                nome: player.name,
                senha: senhaHash,
                nivel: 1,
                email: dados.email,
                celular: util_1.soNumeros(dados.celular),
            });
            return jogador.save();
        });
    }
    criarVeiculo(player, dadosVeiculo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!vehicles_1.Veiculos[dadosVeiculo.modelo]) {
                throw 'Modelo não encontrado';
            }
            const rgbPrimaria = util_1.hexToRgb(dadosVeiculo.corPrimaria);
            const rgbSecundaria = util_1.hexToRgb(dadosVeiculo.corSecundaria);
            const jogador = yield this.loadPlayer(player.name);
            if (!jogador) {
                throw 'Jogador não encontrado';
            }
            const veiculo = new Veiculo_1.Veiculo({
                placaOriginal: dadosVeiculo.placa,
                placaExibido: dadosVeiculo.placa,
                modelo: dadosVeiculo.modelo,
                posicaoX: dadosVeiculo.posicaoX,
                posicaoY: dadosVeiculo.posicaoY,
                posicaoZ: dadosVeiculo.posicaoZ,
                rotacao: 0,
                transparencia: dadosVeiculo.transparencia,
                corPrimariaR: rgbPrimaria.r,
                corPrimariaG: rgbPrimaria.g,
                corPrimariaB: rgbPrimaria.b,
                corSecundariaR: rgbSecundaria.r,
                corSecundariaG: rgbSecundaria.g,
                corSecundariaB: rgbSecundaria.b,
                trancado: dadosVeiculo.trancado,
                motor: dadosVeiculo.motor,
                mundo: 0,
                valorOriginal: dadosVeiculo.valorOriginal,
                valorVenda: dadosVeiculo.valorVenda,
                aVenda: dadosVeiculo.aVenda,
                jogadorVeiculo: jogador,
            });
            yield veiculo.save();
            const veiculoMp = mp.vehicles.new(vehicles_1.Veiculos[dadosVeiculo.modelo], new mp.Vector3(parseFloat(dadosVeiculo.posicaoX), parseFloat(dadosVeiculo.posicaoY), parseFloat(dadosVeiculo.posicaoZ)));
            veiculoMp.engine = dadosVeiculo.motor;
            veiculoMp.locked = dadosVeiculo.trancado;
            veiculoMp.setColorRGB(rgbPrimaria.r, rgbPrimaria.g, rgbPrimaria.b, rgbSecundaria.r, rgbSecundaria.g, rgbSecundaria.b);
            veiculoMp.numberPlate = dadosVeiculo.placa;
            veiculoMp.alpha = dadosVeiculo.transparencia;
            veiculoMp.spawn(veiculoMp.position, 0);
            return true;
        });
    }
}
exports.BrazucasServer = BrazucasServer;
//# sourceMappingURL=brazucas-server.js.map
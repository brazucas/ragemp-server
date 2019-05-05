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
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/of");
const forkJoin_1 = require("rxjs/internal/observable/forkJoin");
const Sequelize = require("sequelize");
const database_1 = require("./database/database");
const Jogador_1 = require("./database/models/Jogador");
const bcrypt_nodejs_1 = require("bcrypt-nodejs");
const util = require("util");
class BrazucasServer {
    constructor() {
        this.database = new database_1.Database();
    }
    onload() {
        return forkJoin_1.forkJoin(...[
            this.database.sync(),
            this.database.authenticate(),
        ]);
    }
    loadPlayer(playerName) {
        const Op = Sequelize.Op;
        return Jogador_1.Jogador.findOne({ where: { nome: { [Op.eq]: playerName } } });
    }
    autenticarJogador(playerName, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const Op = Sequelize.Op;
            const senhaHash = yield util.promisify(bcrypt_nodejs_1.default.hash)(senha, null);
            return Jogador_1.Jogador.findOne({ where: { nome: { [Op.eq]: playerName }, senha: { [Op.eq]: senhaHash } } });
        });
    }
}
exports.BrazucasServer = BrazucasServer;
//# sourceMappingURL=brazucas-server.js.map
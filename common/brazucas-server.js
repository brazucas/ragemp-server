"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database/database");
var usuario_1 = require("./database/models/usuario");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/observable/forkJoin");
var Sequelize = require("sequelize");
var BrazucasServer = (function () {
    function BrazucasServer() {
        this.database = new database_1.Database();
    }
    BrazucasServer.prototype.onload = function () {
        return Observable_1.Observable.forkJoin.apply(Observable_1.Observable, [
            this.database.sync(),
            this.database.authenticate()
        ]);
    };
    BrazucasServer.prototype.loadPlayer = function (playerName) {
        var Op = Sequelize.Op;
        return usuario_1.Usuario.findOne({ where: { nome: (_a = {}, _a[Op.eq] = playerName, _a) } });
        var _a;
    };
    return BrazucasServer;
}());
exports.BrazucasServer = BrazucasServer;
//# sourceMappingURL=brazucas-server.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database/database");
var usuario_1 = require("./database/models/usuario");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var BrazucasServer = (function () {
    function BrazucasServer() {
        this.database = new database_1.Database();
    }
    BrazucasServer.prototype.loadPlayer = function (playerName) {
        return Observable_1.Observable.of(usuario_1.Usuario.findOne({ where: { nome: playerName } }));
    };
    return BrazucasServer;
}());
exports.BrazucasServer = BrazucasServer;
//# sourceMappingURL=brazucas-server.js.map
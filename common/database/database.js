"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
var environment_1 = require("../environment");
var SequelizeOrigin = require("sequelize");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/observable/of");
var Database = (function () {
    function Database() {
        var Op = SequelizeOrigin.Op;
        this.handler = new sequelize_typescript_1.Sequelize({
            host: environment_1.environment.database_host,
            port: environment_1.environment.database_port,
            database: environment_1.environment.database_name,
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            operatorsAliases: Op,
            dialect: 'mysql',
            username: environment_1.environment.database_username,
            password: environment_1.environment.database_password,
            modelPaths: [__dirname + '/models']
        });
    }
    Database.prototype.sync = function () {
        return Rx_1.Observable.of(this.handler.sync());
    };
    Database.prototype.authenticate = function () {
        return Rx_1.Observable.of(this.handler.authenticate());
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=database.js.map
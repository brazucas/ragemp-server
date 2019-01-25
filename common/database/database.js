"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const environment_1 = require("../environment");
const SequelizeOrigin = require("sequelize");
require("rxjs/add/observable/of");
const rxjs_1 = require("rxjs");
class Database {
    constructor() {
        const Op = SequelizeOrigin.Op;
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
    sync() {
        return rxjs_1.from(this.handler.sync());
    }
    authenticate() {
        return rxjs_1.from(this.handler.authenticate());
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map
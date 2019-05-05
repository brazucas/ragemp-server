"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/of");
const from_1 = require("rxjs/internal/observable/from");
const SequelizeOrigin = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const environment_1 = require("../environment");
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
                idle: 10000,
            },
            operatorsAliases: Op,
            dialect: 'mysql',
            username: environment_1.environment.database_username,
            password: environment_1.environment.database_password,
            modelPaths: [__dirname + '/models'],
            sync: {
                alter: true,
            },
        });
    }
    sync() {
        return from_1.from(this.handler.sync());
    }
    authenticate() {
        return from_1.from(this.handler.authenticate());
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map
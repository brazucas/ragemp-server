"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript");
var environment_1 = require("../environment");
var Database = (function () {
    function Database() {
        this.handler = new sequelize_typescript_1.Sequelize({
            database: environment_1.environment.database_name,
            dialect: 'sqlite',
            username: environment_1.environment.database_username,
            password: environment_1.environment.database_password,
            storage: './database.sqlite',
            modelPaths: [__dirname + '/models']
        });
    }
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=database.js.map
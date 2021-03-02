"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BancoConta = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Jogador_1 = require("./Jogador");
const Propriedade_1 = require("./Propriedade");
let BancoConta = class BancoConta extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], BancoConta.prototype, "numero", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Propriedade_1.Propriedade, { foreignKey: { allowNull: false, name: 'propriedade' } }),
    __metadata("design:type", Propriedade_1.Propriedade)
], BancoConta.prototype, "bancoContaPropriedade", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Jogador_1.Jogador, { foreignKey: { allowNull: false, name: 'jogador' } }),
    __metadata("design:type", Jogador_1.Jogador)
], BancoConta.prototype, "bancoContaJogador", void 0);
BancoConta = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        createdAt: 'dataCriado',
        deletedAt: 'dataExcluido',
        updatedAt: 'dataAtualizado',
        paranoid: true,
    })
], BancoConta);
exports.BancoConta = BancoConta;
//# sourceMappingURL=BancoConta.js.map
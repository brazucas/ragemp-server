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
const sequelize_typescript_1 = require("sequelize-typescript");
const BancoConta_1 = require("./BancoConta");
const BancoTipoTransacao_1 = require("./BancoTipoTransacao");
let BancoTransacao = class BancoTransacao extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BancoTransacao.prototype, "valor", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => BancoConta_1.BancoConta, { foreignKey: { allowNull: false, name: 'conta' } }),
    __metadata("design:type", BancoConta_1.BancoConta)
], BancoTransacao.prototype, "bancoTransacaoConta", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => BancoTipoTransacao_1.BancoTipoTransacao, { foreignKey: { allowNull: false, name: 'tipo' } }),
    __metadata("design:type", BancoTipoTransacao_1.BancoTipoTransacao)
], BancoTransacao.prototype, "bancoTransacaoTipo", void 0);
BancoTransacao = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        createdAt: 'dataCriado',
        deletedAt: 'dataExcluido',
        updatedAt: 'dataAtualizado',
        paranoid: true,
    })
], BancoTransacao);
exports.BancoTransacao = BancoTransacao;
//# sourceMappingURL=BancoTransacao.js.map
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
const Profissao_1 = require("./Profissao");
const Notificacao_1 = require("./Notificacao");
let Jogador = class Jogador extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, unique: true }),
    __metadata("design:type", String)
], Jogador.prototype, "nome", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Jogador.prototype, "senha", void 0);
__decorate([
    sequelize_typescript_1.Column({ defaultValue: 1 }),
    __metadata("design:type", Number)
], Jogador.prototype, "nivel", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Profissao_1.Profissao, { foreignKey: { allowNull: false, name: 'profissao' } }),
    __metadata("design:type", Profissao_1.Profissao)
], Jogador.prototype, "jogadorProfissao", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Notificacao_1.Notificacao),
    __metadata("design:type", Array)
], Jogador.prototype, "notificacoes", void 0);
Jogador = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        createdAt: 'dataCriado',
        deletedAt: 'dataExcluido',
        updatedAt: 'dataAtualizado',
        paranoid: true,
    })
], Jogador);
exports.Jogador = Jogador;
//# sourceMappingURL=Jogador.js.map
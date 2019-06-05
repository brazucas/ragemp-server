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
const Jogador_1 = require("./Jogador");
let Veiculo = class Veiculo extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Veiculo.prototype, "placaOriginal", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Veiculo.prototype, "placaExibido", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Veiculo.prototype, "modelo", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Veiculo.prototype, "posicaoX", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Veiculo.prototype, "posicaoY", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Veiculo.prototype, "posicaoZ", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Veiculo.prototype, "posicaoOriginalX", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Veiculo.prototype, "posicaoOriginalY", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Veiculo.prototype, "posicaoOriginalZ", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "rotacao", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "transparencia", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "corPrimariaR", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "corPrimariaG", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "corPrimariaB", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "corSecundariaR", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "corSecundariaG", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "corSecundariaB", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Veiculo.prototype, "trancado", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], Veiculo.prototype, "motor", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: 1 }),
    __metadata("design:type", Number)
], Veiculo.prototype, "mundo", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "valorOriginal", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Veiculo.prototype, "valorVenda", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Veiculo.prototype, "aVenda", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Jogador_1.Jogador, { foreignKey: { allowNull: true, name: 'jogador' } }),
    __metadata("design:type", Jogador_1.Jogador)
], Veiculo.prototype, "jogadorVeiculo", void 0);
Veiculo = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        createdAt: 'dataCriado',
        deletedAt: 'dataExcluido',
        updatedAt: 'dataAtualizado',
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['placaOriginal', 'placaExibido'],
            }
        ]
    })
], Veiculo);
exports.Veiculo = Veiculo;
//# sourceMappingURL=Veiculo.js.map
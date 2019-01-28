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
let Propriedade = class Propriedade extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, unique: true }),
    __metadata("design:type", String)
], Propriedade.prototype, "placaOriginal", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, unique: true }),
    __metadata("design:type", String)
], Propriedade.prototype, "placaExibido", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Propriedade.prototype, "modelo", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Propriedade.prototype, "posicaoX", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Propriedade.prototype, "posicaoY", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Propriedade.prototype, "posicaoZ", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Propriedade.prototype, "rotacao", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Propriedade.prototype, "transparencia", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Propriedade.prototype, "corPrimariaR", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Propriedade.prototype, "corPrimariaG", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Propriedade.prototype, "corPrimariaB", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Propriedade.prototype, "corSecundariaR", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Propriedade.prototype, "corSecundariaG", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Propriedade.prototype, "corSecundariaB", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Propriedade.prototype, "trancado", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], Propriedade.prototype, "motor", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: 1 }),
    __metadata("design:type", Number)
], Propriedade.prototype, "mundo", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Propriedade.prototype, "valorOriginal", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Propriedade.prototype, "valorVenda", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Propriedade.prototype, "aVenda", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Jogador_1.Jogador, { foreignKey: { allowNull: false, name: 'jogador' } }),
    __metadata("design:type", Jogador_1.Jogador)
], Propriedade.prototype, "jogadorVeiculo", void 0);
Propriedade = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        createdAt: 'dataCriado',
        deletedAt: 'dataExcluido',
        updatedAt: 'dataAtualizado',
        paranoid: true,
    })
], Propriedade);
exports.Propriedade = Propriedade;
//# sourceMappingURL=Veiculo.js.map
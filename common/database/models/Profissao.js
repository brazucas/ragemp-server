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
let Profissao = class Profissao extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], Profissao.prototype, "nome", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: 10 }),
    __metadata("design:type", Number)
], Profissao.prototype, "vagas", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, defaultValue: 1 }),
    __metadata("design:type", Number)
], Profissao.prototype, "nivelMinimo", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", Number)
], Profissao.prototype, "salario", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Jogador_1.Jogador, 'profissao'),
    __metadata("design:type", Array)
], Profissao.prototype, "jogadores", void 0);
Profissao = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        createdAt: 'dataCriado',
        deletedAt: 'dataExcluido',
        updatedAt: 'dataAtualizado',
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['nome'],
            }
        ]
    })
], Profissao);
exports.Profissao = Profissao;
//# sourceMappingURL=Profissao.js.map
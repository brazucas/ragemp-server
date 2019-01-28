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
const TipoPropriedade_1 = require("./TipoPropriedade");
let Propriedade = class Propriedade extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Propriedade.prototype, "nomeOriginal", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Propriedade.prototype, "nomeExibido", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Propriedade.prototype, "portaEntradaX", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Propriedade.prototype, "portaEntradaY", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Propriedade.prototype, "portaEntradaZ", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Propriedade.prototype, "portaSaidaX", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Propriedade.prototype, "portaSaidaY", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Propriedade.prototype, "portaSaidaZ", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Propriedade.prototype, "iconePickup", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => TipoPropriedade_1.TipoPropriedade, { foreignKey: 'tipo' }),
    __metadata("design:type", TipoPropriedade_1.TipoPropriedade)
], Propriedade.prototype, "tipoPropriedade", void 0);
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
//# sourceMappingURL=Propriedade.js.map
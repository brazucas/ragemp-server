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
const Propriedade_1 = require("./Propriedade");
let TipoPropriedade = class TipoPropriedade extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TipoPropriedade.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false }),
    __metadata("design:type", String)
], TipoPropriedade.prototype, "nome", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, unique: true }),
    __metadata("design:type", String)
], TipoPropriedade.prototype, "identificador", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Propriedade_1.Propriedade, 'tipo'),
    __metadata("design:type", Array)
], TipoPropriedade.prototype, "propriedades", void 0);
TipoPropriedade = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        createdAt: 'dataCriado',
        deletedAt: 'dataExcluido',
        updatedAt: 'dataAtualizado',
        paranoid: true,
    })
], TipoPropriedade);
exports.TipoPropriedade = TipoPropriedade;
//# sourceMappingURL=TipoPropriedade.js.map
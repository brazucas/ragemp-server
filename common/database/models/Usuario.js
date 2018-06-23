"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var sequelize_typescript_1 = require("sequelize-typescript");
var Usuario = (function (_super) {
    __extends(Usuario, _super);
    function Usuario() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Usuario.prototype, "nome", void 0);
    __decorate([
        sequelize_typescript_1.Column,
        __metadata("design:type", String)
    ], Usuario.prototype, "senha", void 0);
    Usuario = __decorate([
        sequelize_typescript_1.Table({
            timestamps: true,
            createdAt: 'dataCriado',
            deletedAt: 'dataExcluido',
            updatedAt: 'dataAtualizado',
            paranoid: true
        })
    ], Usuario);
    return Usuario;
}(sequelize_typescript_1.Model));
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map
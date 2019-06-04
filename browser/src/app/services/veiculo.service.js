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
const core_1 = require("@angular/core");
const brazucas_eventos_1 = require("../../../../packages/rpg/interfaces/brazucas-eventos");
const ragemp_service_1 = require("./ragemp.service");
let VeiculoService = class VeiculoService {
    constructor(ragemp) {
        this.ragemp = ragemp;
    }
    criarVeiculo(dados) {
        return this.ragemp.callRagempEvent(brazucas_eventos_1.BrazucasEventos.CRIAR_VEICULO, dados);
    }
};
VeiculoService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [ragemp_service_1.RagempService])
], VeiculoService);
exports.VeiculoService = VeiculoService;
//# sourceMappingURL=veiculo.service.js.map
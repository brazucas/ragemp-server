"use strict";
///<reference path="../../../../node_modules/@types/ragemp-s/index.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Veiculo_1 = require("../../../../common/database/models/Veiculo");
const veiculo_provider_1 = require("../../providers/veiculo.provider");
function carregarVeiculos() {
    return __awaiter(this, void 0, void 0, function* () {
        let veiculos = yield Veiculo_1.Veiculo.findAll();
        veiculos.forEach((veiculo) => {
            let veiculoMp = mp.vehicles.new(veiculo.modelo, new mp.Vector3(veiculo.posicaoX, veiculo.posicaoY, veiculo.posicaoZ));
            veiculoMp.setColorRGB(veiculo.corPrimariaR, veiculo.corPrimariaG, veiculo.corPrimariaB, veiculo.corSecundariaR, veiculo.corSecundariaG, veiculo.corSecundariaB);
            veiculoMp.locked = veiculo.trancado;
            veiculoMp.engine = veiculo.motor;
            veiculoMp.dimension = veiculo.mundo;
            veiculoMp.numberPlate = veiculo.placaExibido;
            veiculo_provider_1.VeiculoProvider.veiculos.next({
                mp: veiculoMp,
                storage: veiculo,
            });
        });
    });
}
exports.carregarVeiculos = carregarVeiculos;
//# sourceMappingURL=bootstrap.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const Observable_1 = require("rxjs/Observable");
const mp_veiculo_cor_interface_1 = require("../interfaces/mp.veiculo-cor.interface");
class VeiculoProvider {
    static findFromMp(vehicle) {
        return VeiculoProvider.veiculosArmazenados.find((rpgVeiculo) => rpgVeiculo.mp === vehicle);
    }
    static salvar(vehicle) {
        return new Observable_1.Observable((resolver) => {
            let rpgVeiculo = VeiculoProvider.findFromMp(vehicle);
            if (rpgVeiculo) {
                rpgVeiculo.storage.placaExibido = vehicle.numberPlate;
                rpgVeiculo.storage.trancado = vehicle.locked;
                [rpgVeiculo.storage.corPrimariaR, rpgVeiculo.storage.corPrimariaG, rpgVeiculo.storage.corPrimariaB] = vehicle.getColorRGB(mp_veiculo_cor_interface_1.MpVeiculoCorInterface.PRIMARIA);
                [rpgVeiculo.storage.corSecundariaR, rpgVeiculo.storage.corSecundariaG, rpgVeiculo.storage.corSecundariaB] = vehicle.getColorRGB(mp_veiculo_cor_interface_1.MpVeiculoCorInterface.SECUNDARIA);
                rpgVeiculo.storage.modelo = vehicle.model.toString();
                rpgVeiculo.storage.motor = vehicle.engine;
                rpgVeiculo.storage.mundo = vehicle.dimension;
                rpgVeiculo.storage.rotacao = vehicle.heading;
                rpgVeiculo.storage.transparencia = vehicle.alpha;
                resolver.next(rpgVeiculo.storage.save());
                resolver.complete();
            }
            else {
                resolver.error(`[VeiculoProvider - salvar] Veículo ID ${vehicle.id} não encontrado nos veículos armazenados.`);
            }
        });
    }
    static estacionar(vehicle) {
        return new Observable_1.Observable((resolver) => {
            let rpgVeiculo = VeiculoProvider.findFromMp(vehicle);
            if (rpgVeiculo) {
                rpgVeiculo.storage.posicaoX = vehicle.position.x.toString();
                rpgVeiculo.storage.posicaoY = vehicle.position.y.toString();
                rpgVeiculo.storage.posicaoZ = vehicle.position.z.toString();
                rpgVeiculo.storage.rotacao = vehicle.heading;
                resolver.next(rpgVeiculo.storage.save());
                resolver.complete();
            }
            else {
                resolver.error(`[VeiculoProvider - estacionar] Veículo ID ${vehicle.id} não encontrado nos veículos armazenados.`);
            }
        });
    }
    init() {
        VeiculoProvider.veiculos.subscribe((rpgVeiculo) => {
            VeiculoProvider.veiculosArmazenados.push(rpgVeiculo);
        });
    }
}
VeiculoProvider.veiculosArmazenados = [];
VeiculoProvider.veiculos = new BehaviorSubject_1.BehaviorSubject(null);
exports.VeiculoProvider = VeiculoProvider;
//# sourceMappingURL=veiculo.provider.js.map
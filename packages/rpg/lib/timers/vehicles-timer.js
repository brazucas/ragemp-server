"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesTimer = void 0;
const veiculo_provider_1 = require("../../providers/veiculo.provider");
class VehiclesTimer {
    constructor(brazucasServer) {
        this.brazucasServer = brazucasServer;
        setInterval(() => {
            this.atualizarPosicoes();
        }, 5000);
    }
    atualizarPosicoes() {
        mp.vehicles.forEach((vehicle) => {
            veiculo_provider_1.VeiculoProvider.estacionar(vehicle);
        });
    }
}
exports.VehiclesTimer = VehiclesTimer;
//# sourceMappingURL=vehicles-timer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerExitVehicle = void 0;
const veiculo_provider_1 = require("../providers/veiculo.provider");
function PlayerExitVehicle(brazucasServer, vehicle) {
    veiculo_provider_1.VeiculoProvider.estacionar(vehicle);
}
exports.PlayerExitVehicle = PlayerExitVehicle;
//# sourceMappingURL=playerExitVehicle.js.map
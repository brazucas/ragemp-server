"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEnterVehicle = void 0;
const veiculo_provider_1 = require("../providers/veiculo.provider");
function PlayerEnterVehicle(brazucasServer, vehicle, seat) {
    veiculo_provider_1.VeiculoProvider.estacionar(vehicle);
}
exports.PlayerEnterVehicle = PlayerEnterVehicle;
//# sourceMappingURL=playerEnterVehicle.js.map
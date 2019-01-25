"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Commands() {
    mp.events.addCommand("irparaveiculo", function (player, fullText) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var veh = mp.vehicles[args[0]];
        if (veh && veh.position) {
            player.position = veh.position;
        }
        else {
            console.log('Veículo com ID ' + args[0] + ' não encontrado.');
        }
    });
}
exports.Commands = Commands;
;
//# sourceMappingURL=commands.js.map
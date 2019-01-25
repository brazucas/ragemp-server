"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Commands() {
    mp.events.addCommand("irparaveiculo", (player, fullText, ...args) => {
        let veh = mp.vehicles[args[0]];
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brazucas_eventos_1 = require("../../interfaces/brazucas-eventos");
function notificarTodos(text) {
    mp.players.forEach(player => player.notify(text));
}
exports.notificarTodos = notificarTodos;
function playerEvent(player, event, data, eventId) {
    console.debug(`[PLAYER EVENT] ${player.name} chamou o evento ${event} (ID ${eventId}) com os seguintes dados: ${JSON.stringify(data)}`);
    player.call(brazucas_eventos_1.BrazucasEventos.SERVER, [{
            eventId: eventId,
            event: event,
            data: data,
        }]);
}
exports.playerEvent = playerEvent;
//# sourceMappingURL=player.js.map
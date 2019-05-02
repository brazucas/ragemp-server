"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notificarTodos(text) {
    mp.players.forEach(player => player.notify(text));
}
exports.notificarTodos = notificarTodos;
//# sourceMappingURL=player.js.map
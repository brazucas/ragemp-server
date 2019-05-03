"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PlayerChatHandler(player, text) {
    console.log(`[CHAT] (${player.id}) ${player.name}: ${text}`);
    mp.players.broadcast(`!{#FFFF00}(${player.id}) ${player.name}: !{#FFFFFF}${text}`);
}
exports.PlayerChatHandler = PlayerChatHandler;
//# sourceMappingURL=playerChat.js.map
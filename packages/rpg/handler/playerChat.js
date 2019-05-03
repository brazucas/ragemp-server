"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PlayerChatHandler(player, text) {
    console.log(`[CHAT] ${player.name}: ${text}`);
    mp.players.broadcast(`!{#FFFF00}${player.name}: !{#FFFFFF}${text}`);
}
exports.PlayerChatHandler = PlayerChatHandler;
//# sourceMappingURL=playerChat.js.map
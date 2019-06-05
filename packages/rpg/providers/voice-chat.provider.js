"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoiceChatProvider {
    static habilitar(player, target) {
        console.debug(`[VOICE CHAT] Habilitando voice chat de ${player.name} para ${target.name}`);
        player.enableVoiceTo(target);
    }
    static desabilitar(player, target) {
        console.debug(`[VOICE CHAT] Desabilitando voice chat de ${player.name} para ${target.name}`);
        player.disableVoiceTo(target);
    }
}
exports.VoiceChatProvider = VoiceChatProvider;
//# sourceMappingURL=voice-chat.provider.js.map
export class VoiceChatProvider {
  public static habilitar(player: PlayerMp, target: PlayerMp) {
    console.debug(`[VOICE CHAT] Habilitando voice chat de ${player.name} para ${target.name}`);
    player.enableVoiceTo(target);
  }

  public static desabilitar(player: PlayerMp, target: PlayerMp) {
    console.debug(`[VOICE CHAT] Desabilitando voice chat de ${player.name} para ${target.name}`);
    player.disableVoiceTo(target);
  }
}

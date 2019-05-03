export function PlayerChatHandler(player: PlayerMp, text: string) {
  console.log(`[CHAT] (${player.id}) ${player.name}: ${text}`);

  mp.players.broadcast(`!{#FFFF00}(${player.id}) ${player.name}: !{#FFFFFF}${text}`);
}

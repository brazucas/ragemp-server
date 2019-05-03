export function PlayerChatHandler(player: PlayerMp, text: string) {
  console.log(`[CHAT] ${player.name}: ${text}`);

  mp.players.broadcast(`!{#FFFF00}${player.name}: !{#FFFFFF}${text}`);
}

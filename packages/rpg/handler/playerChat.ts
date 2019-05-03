export function PlayerChatHandler (player: PlayerMp, text: string) {
  console.log('>>> Chat ', player, text);

  mp.players.broadcast(`!{#FFFF00}${player.name}: !{#FFFFFF}${text}`);
}

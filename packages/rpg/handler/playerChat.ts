import { BrazucasServer } from '../../../common/brazucas-server';

export function PlayerChatHandler(brazucasServer: BrazucasServer, player: PlayerMp, text: string) {
  console.log(`[CHAT] (${player.id}) ${player.name}: ${text}`);

  mp.players.broadcast(`!{#FFFF00}(${player.id}) ${player.name}: !{#FFFFFF}${text}`);
}

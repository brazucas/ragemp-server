import { notificarTodos } from '../lib/functions/player';

export function PlayerJoinHandler(player: PlayerMp) {
  console.debug(`[ENTRADA] ${player.name} entrou no servidor (${player.ip})`);

  notificarTodos(`~y~${player.name} ~w~entrou no servidor`);
}

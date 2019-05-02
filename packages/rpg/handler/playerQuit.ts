import { notificarTodos } from '../lib/functions/player';

export function PlayerQuitHandler (player: PlayerMp, exitType: number, reason: number) {
  console.debug(`[SAÍDA] ${player.name} saiu do servidor (IP: ${player.ip}, Tipo: ${exitType}, Razão: ${reason})`);

  notificarTodos(`~r~${player.name} ~w~saiu do servidor`);
}

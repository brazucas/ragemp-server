import * as _ from 'underscore';
import { BrazucasServer } from '../../../common/brazucas-server';
import { notificarTodos } from '../lib/functions/player';
import { Rpg } from '../rpg';

export function PlayerQuitHandler(brazucasServer: BrazucasServer, player: PlayerMp, exitType: number, reason: number) {
  console.debug(`[SAÍDA] ${player.name} saiu do servidor (IP: ${player.ip}, Tipo: ${exitType}, Razão: ${reason})`);

  const playerToRemove = Rpg.playerProvider.players$.value.find(BRZPlayer => BRZPlayer.storage.nome === player.name);

  Rpg.playerProvider.players$.next(_.without(Rpg.playerProvider.players$.value, playerToRemove));

  notificarTodos(`~r~${player.name} ~w~saiu do servidor`);
}

import { razaoMorte } from '../interfaces/death-reason';

export function PlayerDeathHandler (player: PlayerMp, reason: number, killer: PlayerMp) {
  console.debug(`[MORTE] ${killer.name} matou ${player.name} (${reason}) (${razaoMorte(reason)})`);

  mp.players.broadcast(`[MORTE] ${killer.name} matou ${player.name} (${razaoMorte(reason)})`);

  (player as any).resurrect();
}

import { razaoMorte } from '../interfaces/death-reason';

export function PlayerDeathHandler (player: PlayerMp, reason: number, killer: PlayerMp) {
  console.debug(`!{FF0000}[MORTE]!{FFFFFF} ${killer.name} matou ${player.name} (${reason}) (${razaoMorte(reason)})`);

  mp.players.broadcast(`[MORTE] ${killer.name} matou ${player.name} (${razaoMorte(reason)})`);

  player.spawn(player.position);
}

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BrazucasServer } from '../../../common/brazucas-server';
import { Jogador } from '../../../common/database/models/Jogador';
import { BrazucasEventos } from '../interfaces/brazucas-eventos';
import { BRZPlayerInterface } from '../interfaces/player.interface';
import { playerEvent } from '../lib/functions/player';

export class PlayerProvider {
  private static brazucasServer: BrazucasServer;

  constructor(brazucasServer: BrazucasServer) {
    PlayerProvider.brazucasServer = brazucasServer;
  }

  public players$: BehaviorSubject<Array<BRZPlayerInterface>> = new BehaviorSubject([]);

  public findFromMp(player: PlayerMp) {
    return this.players$.value.find((storedPlayer) => storedPlayer.mp.id === player.id);
  }

  public async update(player: PlayerMp, data: Jogador | any) {
    try {
      const brzPlayer = this.findFromMp(player);

      Object.keys(data.toJSON()).forEach((key: string) => brzPlayer.storage[key] = data[key]);

      await brzPlayer.storage.save();

      playerEvent<Jogador>(player, BrazucasEventos.DADOS_JOGADOR, brzPlayer.storage.toJSON());
    } catch (err) {
      console.error(`[ERROR] Um erro ocorreu ao atualizar o jogador.`);
      console.error(err);
    }
  }

  public addPlayer(brzPlayer: BRZPlayerInterface) {
    const players = this.players$.value;

    players.push(brzPlayer);

    this.players$.next(players);
  }

}

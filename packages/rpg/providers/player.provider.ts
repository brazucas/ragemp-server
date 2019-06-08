import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BrazucasServer } from '../../../common/brazucas-server';
import { Jogador } from '../../../common/database/models/Jogador';
import { BrazucasEventos } from '../interfaces/brazucas-eventos';
import { BRZPlayerInterface } from '../interfaces/player.interface';

export class PlayerProvider {
  private static brazucasServer: BrazucasServer;

  constructor(brazucasServer: BrazucasServer) {
    PlayerProvider.brazucasServer = brazucasServer;
  }

  public players$: BehaviorSubject<Array<BRZPlayerInterface>> = new BehaviorSubject([]);

  public findFromMp(player: PlayerMp) {
    return this.players$.value.find((storedPlayer) => storedPlayer.mp.id === player.id);
  }

  public async update(player: PlayerMp, data: Jogador | any, autoSave = true) {
    try {
      const brzPlayer = this.findFromMp(player);

      if (brzPlayer) {
        Object.keys(data).forEach((key: string) => brzPlayer.storage[key] = data[key]);

        if (autoSave) {
          await brzPlayer.storage.save();
        }

        console.log(`Atualizando jogador ${player.name} ${JSON.stringify(brzPlayer.storage.toJSON())}`);

        player.call(BrazucasEventos.ATUALIZAR_DADOS_JOGADOR, [brzPlayer.storage.toJSON()]);
      } else {
        console.warn('[WARNING] Jogador não encontrado para atualizar');
      }

      return true;
    } catch (err) {
      console.error(`[ERROR] Um erro ocorreu ao atualizar o jogador.`);
      console.error(err);

      throw err;
    }
  }

  savePlayer(player: PlayerMp) {
    const brzPlayer = this.findFromMp(player);

    if (brzPlayer) {
      return brzPlayer.storage.save();
    }
  }

  public addPlayer(brzPlayer: BRZPlayerInterface) {
    const players = this.players$.value;

    players.push(brzPlayer);

    this.players$.next(players);
  }

}

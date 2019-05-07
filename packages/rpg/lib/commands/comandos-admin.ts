import { BrazucasServer } from '../../../../common/brazucas-server';

export class ComandosAdmin {
  protected brazucasServer: BrazucasServer;

  constructor(brazucasServer: BrazucasServer) {
    this.brazucasServer = brazucasServer;
  }

  public static tlt(player: PlayerMp, playerOrigemHash: number | string, playerDestinoHash: number | string) {
    if (!playerOrigemHash || !playerDestinoHash) {
      return player.outputChatBox('!{FF0000}[SINTAXE] /tlt [id/nick] [id/nick]');
    }

    let playerOrigem: PlayerMp;
    let playerDestino: PlayerMp;

    if (!isNaN(parseInt((playerOrigemHash as string)))) {
      playerOrigem = mp.players.at((playerOrigemHash as number));
    } else {
      mp.players.forEach((player) => {
        if (player.name.toLowerCase() === (playerOrigemHash as string).toLowerCase()) {
          playerOrigem = player;
        }
      });
    }

    if (!isNaN(parseInt((playerDestinoHash as string)))) {
      playerDestino = mp.players.at((playerDestinoHash as number));
    } else {
      mp.players.forEach((player) => {
        if (player.name.toLowerCase() === (playerDestinoHash as string).toLowerCase()) {
          playerDestino = player;
        }
      });
    }

    if (!playerOrigem) {
      return player.outputChatBox(
        (!isNaN(parseInt((playerOrigemHash as string))))
          ? `Jogador com ID ${playerOrigemHash} não encontrado.` : `Jogador com nick ${playerOrigemHash} não encontrado.`);
    }

    if (!playerDestino) {
      return player.outputChatBox(
        (!isNaN(parseInt((playerDestinoHash as string))))
          ? `Jogador com ID ${playerDestinoHash} não encontrado.` : `Jogador com nick ${playerDestinoHash} não encontrado.`);
    }

    if (playerOrigem === playerDestino) {
      return player.outputChatBox('!{FF0000} Você não pode teleportar um jogador para ele mesmo!');
    }

    console.debug(`[COMANDOS - tlt] teleportando jogador ${playerOrigem.name} para ${playerDestino.name}`);

    playerOrigem.outputChatBox(`!{00FF00} Você foi teleportado para o jogador ${playerDestino.name}`);
    playerDestino.outputChatBox(`!{00FF00} O jogador ${playerOrigem.name} foi teleportado até você`);

    mp.players.broadcast(`!{0000FF}[ADMIN] ${player.name} teleporta ${playerOrigem.name} para ${playerDestino.name}`);

    playerOrigem.position = playerDestino.position;
  }
}

import { BrazucasServer } from '../../../common/brazucas-server';
import { notificarTodos } from '../lib/functions/player';

export function PlayerJoinHandler(brazucasServer: BrazucasServer, player: PlayerMp) {
  console.debug(`[ENTRADA] ${player.name} entrou no servidor (${player.ip})`);

  notificarTodos(`~y~${player.name} ~w~entrou no servidor`);

  brazucasServer.isReady.subscribe(async () => {
    const jogador = await brazucasServer.loadPlayer(player.name);

    if (jogador) {
      console.debug(`[LOAD PLAYER] Jogador ${jogador.nome} carregado`);
    } else {
      console.debug('[LOAD PLAYER] Jogador não encontrado');
    }

    player.call('DadosJogador', [jogador]);
  });
}

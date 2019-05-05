import { AutenticacaoResultado, DadosLogin } from '../../../../browser/src/interfaces/login.interface';
import { BrazucasServer } from '../../../../common/brazucas-server';
import { Jogador } from '../../../../common/database/models/Jogador';
import { environment } from '../../../../common/environment';

export function eventoLogin(brazucasServer: BrazucasServer) {
  mp.events.add('AutenticarJogador', async (player: PlayerMp, dados: DadosLogin) => {
    try {
      const jogador: Jogador = await brazucasServer.autenticarJogador(dados.usuario, dados.senha);

      if (jogador) {
        player.spawn(environment.posicaoLogin);

        player.call('AutenticacaoResultado', [<AutenticacaoResultado>{
          credenciaisInvalidas: false,
          autenticado: true,
        }]);
      } else {
        player.call('AutenticacaoResultado', [<AutenticacaoResultado>{
          credenciaisInvalidas: true,
          autenticado: false,
        }]);
      }
    } catch (err) {
      player.call('AutenticacaoResultado', [<AutenticacaoResultado>{
        credenciaisInvalidas: false,
        autenticado: false,
      }]);
    }
  });
}

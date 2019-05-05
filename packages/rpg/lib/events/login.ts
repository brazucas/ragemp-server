import { AutenticacaoResultado, DadosLogin, DadosRegistro, RegistroResultado } from '../../../../browser/src/interfaces/login.interface';
import { BrazucasServer } from '../../../../common/brazucas-server';
import { Jogador } from '../../../../common/database/models/Jogador';
import { environment } from '../../../../common/environment';

export function eventoLogin(brazucasServer: BrazucasServer) {
  mp.events.add('AutenticarJogador', async (player: PlayerMp, dadosStringify: string) => {
    const dados: DadosLogin = JSON.parse(dadosStringify);
    console.log(`[EVENTO] eventoLogin `, player, dados);

    try {
      const jogador: Jogador = await brazucasServer.autenticarJogador(player.name, dados.senha);

      if (jogador) {
        player.spawn(environment.posicaoLogin);

        player.call('AutenticacaoResultado', [<AutenticacaoResultado> {
          credenciaisInvalidas: false,
          autenticado: true,
        }]);
      } else {
        player.call('AutenticacaoResultado', [<AutenticacaoResultado> {
          credenciaisInvalidas: true,
          autenticado: false,
        }]);
      }
    } catch (err) {
      console.error(err.toString());

      player.call('AutenticacaoResultado', [<AutenticacaoResultado> {
        credenciaisInvalidas: false,
        autenticado: false,
      }]);
    }
  });

  mp.events.add('RegistrarJogador', async (player: PlayerMp, dadosStringify: string) => {
    const dados: DadosRegistro = JSON.parse(dadosStringify);
    console.log('[EVENTO] RegistrarJogador ', player, dados);
    try {
      const jogador: Jogador = await brazucasServer.registrarJogador(player, dados);

      if (jogador) {
        player.spawn(environment.posicaoLogin);

        player.call('RegistroResultado', [<RegistroResultado> {
          erro: false,
          jogador: jogador,
          registrado: true,
        }]);
      } else {
        player.call('RegistroResultado', [<RegistroResultado> {
          erro: true,
        }]);
      }
    } catch (err) {
      console.debug(`[REGISTRO] Um erro ocorreu ao criar o jogador ${player.name}`);
      console.error(err.toString());

      player.call('RegistroResultado', [<RegistroResultado> {
        erro: true,
        mensagem: err.toString() || 'Erro interno ao cadastrar',
      }]);
    }
  });
}

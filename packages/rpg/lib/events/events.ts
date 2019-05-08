import { DadosLogin, DadosRegistro, RegistroResultado } from '../../../../browser/src/interfaces/login.interface';
import { BrazucasServer } from '../../../../common/brazucas-server';
import { Jogador } from '../../../../common/database/models/Jogador';
import { environment } from '../../../../common/environment';
import { BrazucasEventos } from '../../interfaces/brazucas-eventos';
import { playerEvent } from '../functions/player';

export class Events {
  protected brazucasServer: BrazucasServer;

  constructor(brazucasServer: BrazucasServer) {
    this.brazucasServer = brazucasServer;
  }

  public async AutenticarJogador(player: PlayerMp, dados: DadosLogin) {
    try {
      const jogador: Jogador = await this.brazucasServer.autenticarJogador(player.name, dados.senha);

      if (jogador) {
        player.spawn(environment.posicaoLogin);

        return {
          eventoResposta: 'AutenticacaoResultado',
          credenciaisInvalidas: false,
          autenticado: true,
        };
      } else {
        return {
          eventoResposta: 'AutenticacaoResultado',
          credenciaisInvalidas: true,
          autenticado: false,
        };
      }
    } catch (err) {
      console.error(err.toString());

      return {
        eventoResposta: 'AutenticacaoResultado',
        credenciaisInvalidas: false,
        autenticado: false,
      };
    }
  }

  public async RegistrarJogador(player: PlayerMp, dados: DadosRegistro) {
    try {
      const jogador: Jogador = await this.brazucasServer.registrarJogador(player, dados);

      if (jogador) {
        player.spawn(environment.posicaoLogin);

        playerEvent<RegistroResultado>(player, BrazucasEventos.REGISTRO_RESULTADO, {
          erro: false,
          jogador: jogador,
          registrado: true,
        });
      } else {
        playerEvent<RegistroResultado>(player, BrazucasEventos.REGISTRO_RESULTADO, {
          registrado: false,
          erro: true,
        });
      }
    } catch (err) {
      console.debug(`[REGISTRO] Um erro ocorreu ao criar o jogador ${player.name}`);
      console.error(err.toString());

      playerEvent<RegistroResultado>(player, BrazucasEventos.REGISTRO_RESULTADO, {
        registrado: false,
        erro: true,
        mensagem: err.toString() || 'Erro interno ao cadastrar',
      });
    }
  }
}
